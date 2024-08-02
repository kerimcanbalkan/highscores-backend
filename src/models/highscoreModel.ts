import mongoose, { Document, Schema } from "mongoose";

interface IHighscore extends Document {
	username: string;
	highscore: number;
}

const highscoreSchema: Schema = new Schema({
	username: { type: String, required: true, unique: true },
	highscore: { type: Number, required: true },
})

const Highscore = mongoose.model<IHighscore>('Highscore', highscoreSchema)

export default Highscore
