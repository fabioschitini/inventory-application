const mongoose=require(`mongoose`)
const Schema=mongoose.Schema

const PlataformSchema=new Schema({
    name:{type:String,required:true}
})

PlataformSchema.virtual(`url`).get(()=>`/catalog/plataform`+this._id)

module.exports=mongoose.model(`Plataform`,PlataformSchema)