import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Response {
    ok: (
      data?: any,
      options?: {
        messages?: string;
        total?: number | null;
        httpStatus?: number;
      },
    ) => this;

    fail: (
      messages?: string,
      options?: {
        data?: any;
        total?: number | null;
        httpStatus?: number;
      },
    ) => this;
  }
}
