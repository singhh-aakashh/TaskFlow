import { prisma } from "../../../../../prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const emailTemplates = [
    {
      emailTemplate: `<!DOCTYPE html> <html lang="en"> <head>     <meta charset="UTF-8">     <meta name="viewport" content="width=device-width, initial-scale=1.0">     <title>Thank You for Signing In</title>     <style>         body {             background-color: #1a1a1a;             color: #ffffff;             font-family: Arial, sans-serif;             margin: 0;             padding: 0;         }         .container {             max-width: 600px;             margin: 40px auto;             background-color: #2d2d2d;             padding: 30px;             border-radius: 8px;             box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);         }         .header {              text-align: center;             padding-bottom: 20px;         }         .header h1 {              color: #4CAF50;             margin: 0;             font-size: 28px;         }         .content {             line-height: 1.6;         }         .content p {             margin: 15px 0;         }         .button {             text-align: center;             margin: 20px 0;         }         .button a {             background-color: #4CAF50;             color: #ffffff;              padding: 12px 24px;             text-decoration: none;             border-radius: 5px;              display: inline-block;         }         .button a:hover {             background-color: #45a049;         }         .footer {             text-align: center;             font-size: 12px;             color: #aaaaaa;             padding-top: 20px;             border-top: 1px solid #3d3d3d;         }     </style> </head> <body>     <div class="container">         <div class="header">             <h1>{{title}}</h1>         </div>         <div class="content">             <p>Hello {{username}},</p>             <p>Thank you for signing in to {{companyName}}! We\'re thrilled to have you with us.</p>             <p>Your account is now active, and you can start exploring all the features and benefits we have to offer. Whether you\'re here to [briefly state purpose/benefit], we\'re committed to providing you with the best experience possible.</p>             <p>If you have any questions or need assistance, feel free to reach out to our support team anytime.</p>         </div>         <div class="button">             <a href="[Your Website URL]" target="_blank">Get Started Now</a>         </div>         <div class="footer">             <p>© 2025 {{companyName}}. All rights reserved.</p>              <p>{{companyAddress}} | <a href="mailto:support@[yourdomain].com" style="color: #4CAF50;">support@[yourdomain].com</a></p>         </div>     </div> </body> <script>  </script> </html>`,
      templateVariables: {
        title: "Welcome to Task",
        username: "Aakash",
        companyName: "Task Flow",
        companyAddress: "India",
      },
      img: "/emailTempImage1.png",
    },
    {
      emailTemplate: `<!DOCTYPE html> <html lang="en"> <head>   <meta charset="UTF-8">   <meta name="viewport" content="width=device-width, initial-scale=1.0">   <title>Thank You Email</title>   <style>     /* CSS styles are included in the <style> tag */     body {       background-color: #f4f4f4;       color: #333;       font-family: Arial, sans-serif;       margin: 0;       padding: 0;     }     .container {       max-width: 600px;       margin: 40px auto;       background-color: #fff;       padding: 20px;       border-radius: 8px;       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);     }     .header {       text-align: center;       padding-bottom: 20px;       border-bottom: 1px solid #eee;     }     .header h1 {       margin: 0;       font-size: 24px;       color: #000;     }     .title {       text-align: center;       font-size: 36px;       color: #555;       margin: 20px 0;       font-weight: bold;     }     .content {       text-align: center;       line-height: 1.6;     }     .content p {       margin: 15px 0;       color: #666;     }     .coupon-button {       display: inline-block;       background-color: #8b4513;       color: #fff;       padding: 12px 24px;       text-decoration: none;       border-radius: 5px;       margin: 20px 0;       font-weight: bold;     }     .coupon-button:hover {       background-color: #6b2e0e;     }     .terms {       font-size: 12px;       color: #999;       text-align: center;       margin-top: 10px;     }     .footer {       text-align: center;       font-size: 12px;       color: #999;       padding-top: 20px;       border-top: 1px solid #eee;       margin-top: 20px;     }     .footer a {       color: #8b4513;       text-decoration: none;     }     .footer a:hover {       text-decoration: underline;     }     /* Placeholder for image - replace with actual image URL */     .header-img {       background-color: #f0e68c;       height: 100px;       margin-bottom: 20px;       display: flex;       align-items: center;       justify-content: center;     }   </style> </head> <body>   <div class="container">     <div class="header">       <div class="header-img">         {{companyName}}       </div>     </div>     <div class="title">thank you!</div>     <div class="content">       <p>Thank you so much for purchasing from <strong>{{companyName}}</strong>. I really appreciate it! Enjoy 50% off new purchases. Here's a coupon code for you:</p>       <a href="#" class="coupon-button">NP50onE</a>       <div class="terms">         <p>* You can purchase any item from the shop and get 50% off on your next orders using this code.</p>         <p>* This coupon applies to ALL items except the custom services.</p>       </div>     </div>     <div class="footer">       <p><a href={{companyEmail}}>{{companyEmail}}</a> | <a href="mailto:contact@youremail.com">contact@youremail.com</a></p>     </div>   </div> </body> </html>`,
      templateVariables: {
        companyName: "Task Flow",
        companyEmail: "taskflow.com",
      },
      img: "/emailTempImage2.png",
    },
    {
      emailTemplate: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; margin: 40px auto; border-collapse: collapse; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <tr>
        <td align="center" style="padding: 30px 20px;">
          <img src="https://superworks.com/assets/images/logo.svg" alt="Superworks Logo" style="max-height: 40px;" />
        </td>
      </tr>
      <tr>
        <td style="padding: 0 30px;">
          <h2 style="color: #333333; text-align: center;">{{title}}</h2>
          <p><strong>Subject:</strong> Verify Your Email</p>
          <p><strong>Body:</strong></p>
          <p>Hi <strong>{{name}}</strong>,</p>
          <p>Welcome to <strong>{{companyName}}</strong>!</p>
          <p>To complete your registration please verify your email address by clicking the link below:</p>
          <p><strong>[Verification Link]</strong></p>
          <p>If you didn’t sign up for this account please disregard this email.</p>
          <p>Thanks for choosing <strong>{{companyName}}</strong>. We look forward to helping you!</p>
          <p>Best,</p>
          <p><strong>[Your Support Team]</strong><br />
          [Your Contact Information]</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px; background-color: #1e1e2f; color: #ffffff; font-size: 12px;">
          <p style="margin: 0;">Please do not reply to this email. You are receiving this email because you have created an account at 
            <a href="https://superworks.com" style="color: #4da6ff; text-decoration: none;">Superworks</a>.
          </p>
          <p style="margin: 10px 0 0;">Copyright © 2020–2024 Superworks Company. All rights reserved.</p>
          <div style="margin-top: 10px;">
            <a href="#" style="margin: 0 5px;"><img src="https://cdn-icons-png.flaticon.com/24/174/174857.png" alt="LinkedIn" /></a>
            <a href="#" style="margin: 0 5px;"><img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" /></a>
            <a href="#" style="margin: 0 5px;"><img src="https://cdn-icons-png.flaticon.com/24/733/733558.png" alt="Instagram" /></a>
            <a href="#" style="margin: 0 5px;"><img src="https://cdn-icons-png.flaticon.com/24/733/733553.png" alt="YouTube" /></a>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
templateVariables: {
  title:"Verify your email",
  name: "Aakash",
  companyName: "Task Flow",
},
img: "/emailTempImage2.png",
    },
    {
      emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You Card</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #fceef5;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      width: 350px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      position: relative;
      text-align: center;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 1rem;
    }

    .logo {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }

    .thank-you {
      color: #ff5c8d;
      font-size: 1.8rem;
      margin: 0.5rem 0;
      font-weight: 900;
      text-shadow: 2px 2px 0 #ffc107;
    }

    .subheading {
      background: #ffc107;
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-weight: bold;
      color: #333;
      margin-bottom: 1rem;
    }

    .message-box {
      text-align: left;
      background: #fffafc;
      padding: 1rem;
      border-radius: 12px;
      margin: 1rem 0;
      border-left: 6px solid #ffc6e6;
    }

    .cta {
      background-color: #ffc107;
      border: none;
      border-radius: 25px;
      padding: 0.6rem 1.5rem;
      font-weight: bold;
      cursor: pointer;
      margin-top: 1rem;
      transition: background 0.3s ease;
    }

    .cta:hover {
      background-color: #ffb300;
    }

    .footer {
      margin-top: 1.5rem;
      font-size: 0.85rem;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <img src="https://via.placeholder.com/40" alt="logo" class="logo" />
      <h2>Salford & Co</h2>
    </div>

    <h1 class="thank-you">THANK YOU !</h1>
    <div class="subheading">For your subscription !</div>

    <div class="message-box">
      <p>Hello,</p>
      <p>
        We are happy to welcome you to our community. We started out to create
        value for the services you use on a daily basis. We are so glad you
        joined us on our path to something great!
      </p>
      <p>
        Thank you! Keep a look out for our newsletter, where we compile all the
        products, tips, promotions and all updates for you.
      </p>
      <p>with love,<br>Salford & Co Team</p>
    </div>

    <button class="cta">Let’s get started !</button>
    <p class="footer">@reallygreatsite</p>
  </div>
</body>
</html>`,
        templateVariables:{},
        img:"/emailTempImage1.png"
    },
  ];
  try {
    const seeding = await prisma.emailTemplate.createMany({
      data: [...emailTemplates],
      skipDuplicates: true,
    });
    return NextResponse.json(
      { success: "Db seeding is completed" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Seeding failed", error?.message || error);
    return NextResponse.json({ error: "Error while seeding" }, { status: 500 });
  }
}
