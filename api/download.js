const ytdl = require('ytdl-core');

export default async function handler(req, res) {
    const { url, format } = req.query;

    if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'URL YouTube tidak valid.' });
    }

    try {
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, "");

        res.setHeader('Content-Disposition', `attachment; filename="${title}.${format}"`);

        if (format === 'mp3') {
            ytdl(url, { filter: 'audioonly', quality: 'highestaudio' }).pipe(res);
        } else if (format === 'mp4') {
            ytdl(url, { quality: 'highestvideo' }).pipe(res);
        } else {
            res.status(400).json({ error: 'Format tidak didukung.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengunduh video.' });
    }
}
