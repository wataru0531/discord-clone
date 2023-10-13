/**************************************************************

react-error-boundaryは、Reactアプリケーションでエラーハンドリングを行うためのライブラリ
エラーが発生した際にアプリケーション全体を崩壊させずにエラーをキャッチし、適切に処理するのに役立つ

***************************************************************/
import { FallbackProps } from "react-error-boundary";


// エラーが出てるコンポーネントをErrorBoundaryコンポーネントでラップしてやる

export const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>

      <button onClick={ resetErrorBoundary }>Try Again</button>
    </div>
  );
}
