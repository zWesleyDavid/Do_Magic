import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ref } from "process";
import { ClassePersonagem } from "src/enums/classePersonagens.enum";

export type PersonagemDocument = Personagem & Document;

@Schema()
export class Personagem {
    @Prop({ required: true, unique: true, type: Types.ObjectId })
    _id: Types.ObjectId;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    apelido: string;

    @Prop({ enum: ClassePersonagem, required: true })
    classe: ClassePersonagem;

    @Prop({ default: 1 })
    nivel: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }], default: [] })
    itens: Types.ObjectId[];

    @Prop({ required: true })
    forca: number;

    @Prop({ required: true })
    defesa: number;
}

export const PersonagemSchema = SchemaFactory.createForClass(Personagem);