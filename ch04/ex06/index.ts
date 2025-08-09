function resize(params: { maxWidth?: number; maxHeight?: number } | undefined): void {
  let maxWidth = 600;
  let maxHeight = 480;

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}

// if を利用せず && や || を用いて maxWidth や maxHeight を設定する関数 (resize1)
function reseize1(params: { maxWidth?: number; maxHeight?: number } | undefined): void {
  const maxWidth = params && params.maxWidth || 600;
  const maxHeight = params && params.maxHeight || 480;

  console.log({ maxWidth, maxHeight });
}

function reseize2(params: { maxWidth?: number; maxHeight?: number } | undefined): void {
  const maxWidth = params?.maxWidth ?? 600;
  const maxHeight = params?.maxHeight ?? 480;

  console.log({ maxWidth, maxHeight });
}

// resize関数のテスト
resize({ maxWidth: 800, maxHeight: 600 }); // { maxWidth: 800, maxHeight: 600 }
resize({ maxWidth: 800 }); // { maxWidth: 800, maxHeight: 480 }
resize({ maxHeight: 600 }); // { maxWidth: 600, maxHeight: 600 }
resize({}); // { maxWidth: 600, maxHeight: 480 }
// reseize1関数のテスト
reseize1({ maxWidth: 800, maxHeight: 600 }); // { maxWidth: 800, maxHeight: 600 }
reseize1({ maxWidth: 800 }); // { maxWidth: 800, maxHeight: 480 }
reseize1({ maxHeight: 600 }); // { maxWidth: 600, maxHeight: 600 }
reseize1({}); // { maxWidth: 600, maxHeight: 480 }
// reseize2関数のテスト
reseize2({ maxWidth: 800, maxHeight: 600 }); // { maxWidth: 800, maxHeight: 600 }
reseize2({ maxWidth: 800 }); // { maxWidth: 800, maxHeight: 480 }
reseize2({ maxHeight: 600 }); // { maxWidth: 600, maxHeight: 600 }
reseize2({}); // { maxWidth: 600, maxHeight: 480 }