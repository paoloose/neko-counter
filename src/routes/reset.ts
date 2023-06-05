import { Router } from 'express';
import { NekoUser } from '../schemas/NekoUser';

const router = Router();

router.get('/reset/:profile', async (req, res) => {
  const { pass } = req.query;
  const { profile: profile_id } = req.params;

  if (typeof pass !== 'string') {
    return res.status(400).json({
      status: 400,
      error: `To reset your counter, provide your password as a query parameter: /reset/${profile_id}?pass=your-password`
    });
  }

  let neko_info = await NekoUser.find(profile_id);

  if (!neko_info) {
    return res.status(404).json({
      status: 404,
      error: `Profile with ID ${profile_id} not found.`
    });
  }

  if (neko_info.props.password !== pass) {
    return res.status(403).json({
      status: 403,
      error: `Incowwect password... sooooo sowwy!`
    });
  }

  try {
    const count_before = neko_info.props.count;
    neko_info.props.count = 0;
    await neko_info.save();
    return res.status(200).json({
      status: 200,
      message: `Countew for ${profile_id} reset to zewo successfuwwy (￣^￣ )ゞ`,
      before: count_before
    });
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      error: 'Something went wrong... so sowwy! (´；ω；｀)'
    });
  }
});

export default router;
