export interface OpenApiSource {
  name: string;
  url: string;
}

export interface OpenApiOptions {
  hosts: OpenApiSource[];
}

export interface SwaggerClientResult {
  name: string;
  isSuccess: boolean;
  option: OpenApiSource;
}