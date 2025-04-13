import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ref } from "process";
import { ClassePersonagem } from "src/enums/classePersonagens.enum";
import { Item } from "src/itens/schemas/itens.schema";

export type PersonagemDocument = Personagem & Document;

@Schema()
export class Personagem {
    id: string;
    @Prop({required: true})
    nome: string;
    
    @Prop({required: true})
    apelido: string;
    
    @Prop({enum: ClassePersonagem, required: true})
    classe: ClassePersonagem;
    
    @Prop({required: true})
    nivel: number;
    
    @Prop({type: [{ type: Types.ObjectId, ref: 'Item'}], default:[]})
    itens: Types.ObjectId[];
    
    @Prop({required: true})
    forca: number;
    
    @Prop({required: true})
    defesa: number; 
}

export const PersonagemSchema = SchemaFactory.createForClass(Personagem);