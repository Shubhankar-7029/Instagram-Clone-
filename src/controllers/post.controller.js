const postModel = require('../models/post.model');

const imageKitModule = import('@imagekit/nodejs');

async function createPostController(req, res) {
    try {
        console.log(req.body, req.file);

        const { default: ImageKit, toFile } = await imageKitModule;

        const imagekit = new ImageKit({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        });

        const file = await imagekit.files.upload({
            file: await toFile(
                Buffer.from(req.file.buffer),
                'file'
            ),
            fileName: 'Test'
        });

        console.log('ImageKit response:', file);

        res.send(file);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Image upload failed',
            error: error.message
        });
    }
}

module.exports = {
    createPostController
};