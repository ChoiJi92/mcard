import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPaths(),
    isProduction &&
      visualizer({
        filename: 'stats.html', // 분석 결과 파일 이름
        open: true, // 빌드 후 자동으로 브라우저에서 열기
        gzipSize: true, // gzip 크기 표시
        brotliSize: true, // brotli 크기 표시
        template: 'treemap', // 시각화 템플릿 (sunburst, treemap, network)
      }),
  ],
})
