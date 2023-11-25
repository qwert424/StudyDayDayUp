export default {
    proxy: {
        "/api": {
            target: "http://127.0.0.1:5500/%E7%9F%A5%E8%AF%86%E4%B8%8E%E5%AE%9E%E8%B7%B5%20%E5%B0%B1%E4%B8%9A/07.%20CompositionApi/%E8%AF%BE%E4%BB%B6/",
            rewrite: (path) => path.replace(/^\/api/, ""),
        },
    },
};
