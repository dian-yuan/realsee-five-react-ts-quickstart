import path from 'path'
import glob from 'glob'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const appSrc = path.resolve(process.cwd(), 'src')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  return {
    base: '/',
    // server: {
    //   host: true,
    //   port: 3001,
    //   open: '/',
    //   hmr: isEnvProduction
    //     ? false
    //     : {
    //         overlay: false,
    //       },
    // },
    server: {
      port: 8001,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: 'https://app-gateway.realsee.cn',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        }
      }
    },
    build: {
      rollupOptions: {
        input: glob
          .sync(path.resolve(appSrc, './**/index.html'))
          .map((filepath) => ({
            [path.relative(appSrc, path.dirname(filepath))]: filepath,
          }))
          .filter(Boolean)
          .reduce((prev, curr) => ({ ...prev, ...curr }), {
            index: path.resolve(process.cwd(), 'index.html'),
          }),
        output:{
          assetFileNames: (assetInfo) => {
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) { // 匹配资源文件后缀
              return `media/[name].[hash][ext]`;  // 创建media文件夹存放匹配的资源文件,name为该文件的原名，hash为哈希值，ext为文件后缀名，以[name].[hash][ext]命名规则
            }
            return `assets/[name]-[hash].[ext]`; // 不匹配的资源文件存放至assets，以[name]-[hash].[ext]命名规则，注意两处的命名规则不同
          },
        }
      },
    },
    plugins: [react()],
  }
})
