<!-- markdownlint-disable MD033 MD041 -->
<div align="center">
    <h1 align="center">Neko counter</h1>
</div>

<div align="center">
    <img
        src="https://neko.up.railway.app/counter/neko_counter?style=badge"
        title="Now you can count your visitors with nekos too!"
        height="20"
    />
    <a href="https://railway.app/">
        <img src="https://img.shields.io/static/v1?label=hosted by&message=railway.app&logo=Railway&logoColor=white&labelColor=black&color=755494"/>
    </a>
    <a href="https://github.com/paoloose/neko-counter">
        <img src="https://img.shields.io/github/package-json/v/paoloose/neko-counter?labelColor=black&color=8a4641"/>
    </a>
</div>

<br>

<div align="center">
    <p align="center">Now you can count your visitors with nekos too <code>>u<</code>!</p>
</div>

## Usage

Register your profile by visiting the following link:

```url
https://neko.up.railway.app/create?id=<your_id>&password=<pass>&github_only=<true/false>
```

Where:

- `id=<your_id>` is your unique id, it can be your username, whatever you want.
- `password=<pass>` is your password, this will allow you to reset your counter.
- `github_only=<true/false>` is whether the counter can only be incremented when visiting from github or not. Very
  handy to avoid spamming.

Yay! >w< Now you can add the following markdown to your README.md file

```md
![Visitors counter](https://neko.up.railway.app/counter/<your_id>)
```

![Visitors counter](https://neko.up.railway.app/counter/neko_counter?title=Repo%20viewers)

Or much better, wrap it with an `<img>` tag (︶ω︶ ):

```html
<img
    src="https://neko.up.railway.app/counter/neko_counter"
    title="Now you can count your visitors with nekos too!"
    height="20"
/> <!-- custom height -->
```

Use the following query params to customize your counter:

- `title=<title>` is the title of the counter, it will be displayed when hovering the counter (default: `Profile views`);
- `color=<color>` is the color of the counter, it can be a hex color or a css color name (default: `#fff`).
- `bg_color=<color>` the background box color of the counter, it can be a hex color or a css color name (default: `#000`).

## Tiny badge

Is the counter too big for ya? we have badges too! Set `style=badge` like this:

```md
![Visitors counter](https://neko.up.railway.app/counter/neko_counter?style=badge)
```

<img
    src="https://neko.up.railway.app/counter/neko_counter?style=badge"
    title="Now you can count your visitors with nekos too!"
    height="20"
/> `<-----` (o(´∀｀)o))✧˖° ✨
