export const errorLog = (msg: string, error: any) => {
  console.error(`[ERROR OCCURRED]：error is below, message: ${msg}`);
  console.error(error);
  console.error("--------error message end");
};
