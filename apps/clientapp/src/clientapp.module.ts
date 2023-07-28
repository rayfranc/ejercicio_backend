import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ClientappController } from './clientapp.controller';
import { ClientappService } from './clientapp.service';
import { Client, ClientSchema } from './schemas/client.scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])
  ],
  controllers: [ClientappController],
  providers: [ClientappService],
})
export class ClientappModule {}
