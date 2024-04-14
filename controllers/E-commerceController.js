module.exports.shop_get = (req, res) => {
    res.render('E-commerceViews/shop')
  }
  
  module.exports.about_get = (req, res) => {
    res.render('E-commerceViews/about')
  }
  module.exports.contact_get = (req, res) => {
    res.render('E-commerceViews/contact')
  }
  
  module.exports.contact_post = async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Replace with your email provider SMTP host
        port: 587, // SMTP port (587 for TLS/StartTLS)
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'pariteadnan@gmail.com', // your email
            pass: 'Adz.yf452656' // your email account password
        }
    });
  
    try {
      let info = await transporter.sendMail({
          from: `pariteadnan@gmail.com`, // Ensure the sender address matches the login
          to: 'pariteadnan2@gmail.com',
          subject: `Website Contact Form: ${subject}`,
          text: `You have received a new message from ${name} (${email}):\n\n${message}`,
      });
  
      console.log('Message sent: %s', info.messageId);
      res.json({ message: 'Email sent successfully' });
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
  }
  };
  
  const products = [
    { id: 1, name: "Windbreaker Jacket", category: "Women > Jacket's", price: 29.99, discountPrice: 14.99, images: ['details-1.png', 'details-2.png', 'details-3.png', 'details-4.png'], description: "Light Gray solid top, has a boat neck, 3/4 sleeves" },
    { id: 2, name: "Fur-lined Hoodie", category: "Men > Hoodies", price: 49.99, discountPrice: 24.99, images: ['cart-1.png'], description: "Cozy fur-lined hoodie, ideal for staying warm in style." },
    { id: 3, name: "Striped T-shirt", category: "Women > T-shirts", price: 19.99, discountPrice: 9.99, images: ['product-3.png'], description: "Black and white striped T-shirt, a versatile addition to any casual outfit." },
    { id: 4, name: "Adidas Track Jacket", category: "Men > Jackets", price: 59.99, discountPrice: 29.99, images: ['product-6.png'], description: "Classic Adidas track jacket in red, perfect for sporty outerwear." },
    { id: 5, name: "Ruffled Pink Blouse", category: "Women > Blouses", price: 29.99, discountPrice: 14.99, images: ['slide-1.png'], description: "Chic pink blouse with ruffle detailing, great for office or day out." },
    { id: 6, name: "Winter Puffer Jacket", category: "Men > Jackets", price: 89.99, discountPrice: 44.99, images: ['new-3.png'], description: "Warm puffer jacket with fur collar, essential for cold winters." },
    { id: 7, name: "Red Trench Coat", category: "Women > Jackets", price: 70.99, discountPrice: 35.49, images: ['new-1.png'], description: "Elegant red trench coat with a belted waist and double-breasted design, perfect for stylish layering in cooler weather." },
    { id: 8, name: "Air Jordan Zip Hoodie", category: "Men > Hoodies", price: 79.99, discountPrice: 39.99, images: ['new-2.png'], description: "Stylish Air Jordan hoodie with zip, combining comfort with iconic design." },
    { id: 9, name: "Windbreaker Jacket", category: "Men > Jackets", price: 69.99, discountPrice: 34.99, images: ['product-5.png'], description: "Bright yellow quilted windbreaker jacket, a statement piece that's also practical." },
    { id: 10, name: "Varsity Jacket", category: "Men > Jackets", price: 49.99, discountPrice: 24.99, images: ['new-4.png'], description: "Classic varsity jacket for a timeless casual look." },
    { id: 11, name: "Nike Windbreaker", category: "Men > Jackets", price: 79.99, discountPrice: 39.99, images: ['new-6.png'], description: "Lightweight Nike windbreaker, ideal for running or as a casual sporty jacket." },
    { id: 12, name: "Cozy Fur-Lined Hoodie", category: "Men > Hoodies", price: 65.99, discountPrice: 32.99, images: ['product-2.png'],description: "A luxurious fur-lined hoodie to keep you warm during the winter months. Features soft lining and spacious pockets." },
    { id: 13, name: "Elegant Pink Overcoat", category: "Women > Outerwear", price: 120.99, discountPrice: 60.49, images: ['product-4.png'], description: "This elegant overcoat is perfect for the transition into spring. Soft fabric and a comfortable fit make it a stylish addition to any outfit." },
    { id: 14, name: "The Cardigan", category: "Men > Sweaters", price: 45.99, discountPrice: 22.99, images: ['cardigan-1.png', 'cardigan-2.png'], description: "Navy and red striped cardigan, a classic wardrobe essential. Versatile and comfortable, suitable for various occasions." },
  ];
  
  module.exports.details_get = (req, res) => {
    const productId = parseInt(req.params.productId);
      const product = products.find(p => p.id === productId);
  
      if (product) {
          res.render('E-commerceViews/details', { product: product });
      } else {
          res.status(404).send('Product not found');
      }
  }

  module.exports.home_get = (req, res) => {
    res.render('E-commerceViews/home')
  }