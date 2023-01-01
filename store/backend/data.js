import bcrypt from 'bcryptjs'
const data = {
  users:[
{
  name:'Rania',
  email: 'admin@shary.com',
  password: bcrypt.hashSync('123456'),
  isAdmin:true,
},
{
  name:'john',
  email:'user@shary.com',
  password: bcrypt.hashSync('123456'),
  isAdmin:false,

}
  ],
  products: [
    {
      
      name: "Tumbler",
      slug: "color-changing tumbler",
      category: "Tumblers",
      image: "/images/tumbler.jpeg",
      price: 15,
      rating: 2.5,
      numReviews: 10,
      stock: 5,
      description: "Personalized color-changing tumbler",
 
    },
    {
    
      name: "Shirts",
      slug: "long-sleeve shirts",
      category: "shirts",
      image: "/images/tshirt.jpeg",
      price: 30,
      rating: 3.7,
      numReviews: 10,
      stock: 5,
      description: "Personalized short-sleeve shirts",
 
    },
    {
      
      name: "Stickers",
      slug: "clear foil sticker",
      category: "stickers",
      image: "/images/sticker.jpeg",
      price: 30,
      rating: 4.3,
      numReviews: 40,
      stock: 0,
      description: "Personalized stickers, qty:100",
  
    },
  ],
};
export default data;
