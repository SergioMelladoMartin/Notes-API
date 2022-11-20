import {Document, Schema, model} from 'mongoose';

interface NoteDocumentInterface extends Document {
  name: string,
  content: string
}

const NoteSchema = new Schema<NoteDocumentInterface>({
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    }
  
  });
  
  export const Note = model<NoteDocumentInterface>('Notes', NoteSchema);