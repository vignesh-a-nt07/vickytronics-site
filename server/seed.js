const prisma = require("./utills/db");

async function seedDatabase() {
  const { nanoid } = await import("nanoid");
  try {
    console.log("Seeding database with complete product data...");

    // Delete existing data
    await prisma.product.deleteMany({});
    await prisma.merchant.deleteMany({});
    await prisma.category.deleteMany({});
    console.log("Cleared existing data");

    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          id: nanoid(),
          name: "Smartphones",
        },
      }),
      prisma.category.create({
        data: {
          id: nanoid(),
          name: "Laptops",
        },
      }),
      prisma.category.create({
        data: {
          id: nanoid(),
          name: "Headphones",
        },
      }),
      prisma.category.create({
        data: {
          id: nanoid(),
          name: "Cameras",
        },
      }),
      prisma.category.create({
        data: {
          id: nanoid(),
          name: "TVs",
        },
      }),
    ]);
    console.log("Categories created:", categories.map((c) => c.name));

    // Create merchant
    const merchant = await prisma.merchant.create({
      data: {
        id: nanoid(),
        name: "Tech Store",
        email: "merchant@techstore.com",
        phone: "+123456789",
        address: "123 Tech Street",
        status: "ACTIVE",
      },
    });
    console.log("Merchant created:", merchant.id);

    // Create products with real image URLs
    const products = [
      // Smartphones
      {
        title: "Samsung Galaxy S24 Ultra",
        price: 1299.99,
        description:
          "The latest flagship smartphone from Samsung with 200MP camera and S Pen support. Features advanced AI capabilities, all-day battery life, and premium design.",
        manufacturer: "Samsung",
        categoryId: categories.find((c) => c.name === "Smartphones").id,
        inStock: 25,
        mainImage:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
        rating: 5,
      },
      {
        title: "Apple iPhone 15 Pro Max",
        price: 1199.99,
        description:
          "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Exceptional telephoto and ultra-wide capabilities.",
        manufacturer: "Apple",
        categoryId: categories.find((c) => c.name === "Smartphones").id,
        inStock: 30,
        mainImage:
          "https://images.unsplash.com/photo-1592286927505-1def25e85dac?w=500",
        rating: 5,
      },
      {
        title: "Google Pixel 8 Pro",
        price: 999.99,
        description:
          "Advanced AI capabilities with Google's computational photography. Magic Eraser, Real Tone, and best-in-class video recording.",
        manufacturer: "Google",
        categoryId: categories.find((c) => c.name === "Smartphones").id,
        inStock: 28,
        mainImage:
          "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500",
        rating: 4,
      },
      {
        title: "OnePlus 12",
        price: 799.99,
        description:
          "Fast charging with Aqua Touch display. Snapdragon 8 Gen 3 processor for flagship performance at competitive pricing.",
        manufacturer: "OnePlus",
        categoryId: categories.find((c) => c.name === "Smartphones").id,
        inStock: 35,
        mainImage:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        rating: 4,
      },
      // Laptops
      {
        title: "Apple MacBook Pro 16-inch M3",
        price: 2499.99,
        description:
          "Powerful laptop with M3 Pro chip and stunning Liquid Retina XDR display. Perfect for professionals with up to 22 hours battery life.",
        manufacturer: "Apple",
        categoryId: categories.find((c) => c.name === "Laptops").id,
        inStock: 15,
        mainImage:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
        rating: 5,
      },
      {
        title: "Dell XPS 13 Plus",
        price: 1299.99,
        description:
          "Ultracompact and ultraportable laptop with Intel Core i7, stunning OLED display. Great for professionals on the go.",
        manufacturer: "Dell",
        categoryId: categories.find((c) => c.name === "Laptops").id,
        inStock: 20,
        mainImage:
          "https://images.unsplash.com/photo-1640622306032-4c94028dd6b5?w=500",
        rating: 4,
      },
      {
        title: "Lenovo ThinkPad X1 Carbon",
        price: 1499.99,
        description:
          "Business laptop excellence with Intel Core i7, 14-inch OLED display, and legendary durability. Perfect for enterprise.",
        manufacturer: "Lenovo",
        categoryId: categories.find((c) => c.name === "Laptops").id,
        inStock: 18,
        mainImage:
          "https://images.unsplash.com/photo-1588872657360-55e9e42b5410?w=500",
        rating: 4,
      },
      {
        title: "HP Spectre x360",
        price: 1699.99,
        description:
          "Convertible 2-in-1 laptop with touchscreen, Intel i7, and premium build. Versatile for work and entertainment.",
        manufacturer: "HP",
        categoryId: categories.find((c) => c.name === "Laptops").id,
        inStock: 12,
        mainImage:
          "https://images.unsplash.com/photo-1593642632823-8f0062e77cbf?w=500",
        rating: 4,
      },
      // Headphones
      {
        title: "Sony WH-1000XM5 Headphones",
        price: 399.99,
        description:
          "Premium noise-canceling wireless headphones with exceptional sound quality. Industry-leading noise cancellation with 30-hour battery.",
        manufacturer: "Sony",
        categoryId: categories.find((c) => c.name === "Headphones").id,
        inStock: 50,
        mainImage:
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
        rating: 5,
      },
      {
        title: "Bose QuietComfort Ultra Headphones",
        price: 429.99,
        description:
          "Revolutionary active noise cancellation with spatial audio. Immersive sound and comfortable fit for extended wear.",
        manufacturer: "Bose",
        categoryId: categories.find((c) => c.name === "Headphones").id,
        inStock: 35,
        mainImage:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        rating: 5,
      },
      {
        title: "Apple AirPods Pro Max",
        price: 549.99,
        description:
          "Premium spatial audio with dynamic head tracking. Seamless integration with Apple ecosystem and exceptional build quality.",
        manufacturer: "Apple",
        categoryId: categories.find((c) => c.name === "Headphones").id,
        inStock: 22,
        mainImage:
          "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500",
        rating: 5,
      },
      {
        title: "Sennheiser Momentum 4 Wireless",
        price: 349.99,
        description:
          "60-hour battery life with award-winning sound quality. Comfort-first design perfect for all-day listening.",
        manufacturer: "Sennheiser",
        categoryId: categories.find((c) => c.name === "Headphones").id,
        inStock: 40,
        mainImage:
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
        rating: 4,
      },
      // Cameras
      {
        title: "Canon EOS R6 Mark II Camera",
        price: 2499.99,
        description:
          "Full-frame mirrorless camera with 24.2MP sensor and advanced autofocus system. Captures stunning photos and 4K video.",
        manufacturer: "Canon",
        categoryId: categories.find((c) => c.name === "Cameras").id,
        inStock: 8,
        mainImage:
          "https://images.unsplash.com/photo-1606980288917-8f1c01a4f6fc?w=500",
        rating: 5,
      },
      {
        title: "Sony A7R VI Camera",
        price: 3998.99,
        description:
          "Professional full-frame mirrorless camera with 61MP resolution. Perfect for high-resolution photography and videography.",
        manufacturer: "Sony",
        categoryId: categories.find((c) => c.name === "Cameras").id,
        inStock: 5,
        mainImage:
          "https://images.unsplash.com/photo-1606833248051-5ce98dc1e566?w=500",
        rating: 5,
      },
      {
        title: "Nikon Z8 Professional Camera",
        price: 3700.99,
        description:
          "Full-frame mirrorless with 45.7MP sensor and robust weather sealing. Perfect for demanding professional shooting.",
        manufacturer: "Nikon",
        categoryId: categories.find((c) => c.name === "Cameras").id,
        inStock: 4,
        mainImage:
          "https://images.unsplash.com/photo-1516035069371-29ad0afe3f3d?w=500",
        rating: 5,
      },
      {
        title: "DJI Mavic 3 Pro Drone",
        price: 1999.99,
        description:
          "Professional aerial camera with triple camera setup. 4/3 CMOS and Hasselblad optics for cinematic drone footage.",
        manufacturer: "DJI",
        categoryId: categories.find((c) => c.name === "Cameras").id,
        inStock: 10,
        mainImage:
          "https://images.unsplash.com/photo-1516996122174-8414752a9f78?w=500",
        rating: 5,
      },
      // TVs
      {
        title: "LG OLED C3 55-inch TV",
        price: 1799.99,
        description:
          "Stunning 4K OLED TV with AI-powered picture processing and webOS smart platform. Perfect blacks and vibrant colors.",
        manufacturer: "LG",
        categoryId: categories.find((c) => c.name === "TVs").id,
        inStock: 10,
        mainImage:
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
        rating: 5,
      },
      {
        title: "Samsung QN95C 85-inch Neo QLED",
        price: 3999.99,
        description:
          "Premium 85-inch Neo QLED TV with quantum dot technology and AI upscaling. Perfect for cinematic home entertainment.",
        manufacturer: "Samsung",
        categoryId: categories.find((c) => c.name === "TVs").id,
        inStock: 4,
        mainImage:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
        rating: 5,
      },
      {
        title: "Sony A95L 65-inch OLED",
        price: 3499.99,
        description:
          "Premium OLED with XR Processor and full array backlight. Exceptional contrast and smooth gaming at 120Hz.",
        manufacturer: "Sony",
        categoryId: categories.find((c) => c.name === "TVs").id,
        inStock: 6,
        mainImage:
          "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=500",
        rating: 5,
      },
      {
        title: "TCL 75-inch QLED TV",
        price: 899.99,
        description:
          "Budget-friendly 4K QLED with quantum dot technology. Great value for large room entertainment setup.",
        manufacturer: "TCL",
        categoryId: categories.find((c) => c.name === "TVs").id,
        inStock: 16,
        mainImage:
          "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500",
        rating: 4,
      },
    ];

    // Create all products
    const createdProducts = await Promise.all(
      products.map((product) =>
        prisma.product.create({
          data: {
            id: nanoid(),
            slug: product.title
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, ""),
            ...product,
            merchantId: merchant.id,
          },
        })
      )
    );

    console.log("\n✅ Products created:");
    createdProducts.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.title} - $${p.price}`);
    });

    console.log("\n✅ Database seeded successfully!");
    console.log(`Total products: ${createdProducts.length}`);
    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    await prisma.$disconnect();
  }
}

seedDatabase();
