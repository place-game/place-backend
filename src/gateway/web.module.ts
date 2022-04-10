import { Module } from "@nestjs/common";
import { WebGateway } from "./web.gateway";

@Module({
  providers: [WebGateway],
})
export class WebModule {}