import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TipoItem } from "src/enums/classeItens.enum";
import { Types } from "mongoose";

export type ItemMagicoDocument = ItemMagico & Document;

@Schema()
export class ItemMagico {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true, enum: TipoItem })
    tipo: TipoItem;

    @Prop({ required: true, min: 0, max: 10 })
    forca: number;

    @Prop({ required: true, min: 0, max: 10 })
    defesa: number;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Personagem' })
    personagemId: Types.ObjectId;

    @Prop({ required: true })
    descricao: string;
}

export const ItemMagicoSchema = SchemaFactory.createForClass(ItemMagico);