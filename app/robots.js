export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: 'https://ac.istehitsc.com/sitemap.xml',
    };
}
