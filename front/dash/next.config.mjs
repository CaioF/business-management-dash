/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: function(){
        return [
            {
                source: "/list",
                destination: "http://back:3001/list"
            }
        ]
    }
};

export default nextConfig;
