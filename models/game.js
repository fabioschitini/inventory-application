const mongoose=require(`mongoose`)
const Schema=mongoose.Schema

const GameSchema=new Schema({
    name:{type:String,required:true},
    studio:{type:String,required:true},
    description:{type:String,required:true},
    category:[{type:Schema.ObjectId,ref:`Category`}],
    plataform:[{type:Schema.ObjectId,ref:`Plataform`}],
    amount:{type:Number,required:true}

})
GameSchema.virtual(`url`).get(()=>`catalog/games`+this._id)

module.exports=mongoose.model(`Game`,GameSchema);

