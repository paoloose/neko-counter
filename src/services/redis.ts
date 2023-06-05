import { createClient } from 'redis';

export abstract class DBSchema {
  abstract id: string;
  abstract validate(): boolean;
}

class RedisDB {
  client: ReturnType<typeof createClient>

  constructor() {
    this.client = createClient({
      url: process.env['REDIS_CONNECTION_URL']
    });

    this.client.on('error', () => {
      console.error('Failed to connect to redis');
      console.error('Exiting.');
      process.exit(1);
    });

    this.client.on('ready', () => {
      console.log('Connected to redis');
    });
  }

  async connect() {
    try {
      await this.client.connect();
    }
    catch {
      console.error('Failed to connect to redis');
      console.error('Exiting.');
      process.exit(1);
    }
  }

  createCollection<Schema extends DBSchema>(name: string, SchemaClass: Constructor<Schema>) {
    const validate_function = SchemaClass.prototype.validate as () => boolean;
    // const inherited_methods = Object.getOwnPropertyNames(SchemaClass.prototype);

    return class Document {
      props: OmitMethods<Schema>;
      methods: PickMethods<Omit<Schema, 'validate'>> = {} as PickMethods<Omit<Schema, 'validate'>>;
      static collection_name = name;
      validate: () => boolean;

      constructor(data: OmitMethods<Schema>) {
        // Instantiate a schema_class with all its default values
        const schema = new SchemaClass();

        // This will inherit all the methods as well, so the 'validate' method
        // will be passed to the props. We don't want that, so we delete it and
        // bind it to the schema instance
        const inherited_methods = Object.getOwnPropertyNames(SchemaClass.prototype);

        for (let method of inherited_methods) {
          if (method === 'constructor' || method === 'validate') continue;
          // @ts-expect-error
          this.methods[method] = SchemaClass.prototype[method].bind(schema);
        }

        this.validate = validate_function.bind(schema);

        // The passed `data` object will override the default values
        Object.assign(schema, data);
        this.props = schema;
      }

      static default() {
        return new Document({} as Schema);
      }

      async save() {
        // Note: typescript is not inferring the type of this.props properly
        //       It should inherit the id of the Schema
        const db_key = `${Document.collection_name}:${(this.props as any).id}`;
        await db.client.set(db_key, JSON.stringify(this.props));
      }

      static async find(id: string) {
        const db_key = `${Document.collection_name}:${id}`;
        const str_data = await db.client.get(db_key);
        if (!str_data) return null;

        try {
          // Since this is stored in the database,
          // we expect that it satisfies the properties of the Schema
          const document = JSON.parse(str_data) as Schema;
          return new Document(document);
        }
        catch {
          return null;
        }
      }
    }
  }
}

export const db = new RedisDB();
await db.connect();
