import { CardContent, Typography, Grid } from "@mui/material";
import { IoLogoTwitter } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <div style={{ backgroundColor: "black", color: "white", padding: "2%", marginTop:"3.4%", borderRadius:"5px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <CardContent>
            <Typography variant="h5">Help</Typography>
            <a className="media">Contact Us</a>
            <Typography>FAQ</Typography>
            <Typography>Accessibility</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CardContent>
            <Typography variant="h5">Shop</Typography>
            <Typography>Women's Clothing</Typography>
            <Typography>Men's Clothing</Typography>
            <Typography>Electronics</Typography>
            <Typography>Jewellery</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CardContent>
            <Typography variant="h5">Address</Typography>
            <Typography>
              5/714, Royal nagar teacher's colony, Udumalpet-642126
            </Typography>
            <Typography>
              <MdEmail /> akshaikhanna123@gmail.com
            </Typography>
            <Typography>
              <FaPhoneAlt /> 6379044583
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CardContent>
            <Typography variant="h5">Connect with us</Typography>
            <Grid container spacing={1}>
              <Grid item>
                <a
                  href="https://x.com/akshai45049?t=3tO1XIe3HUG8nn2CmUgGhg&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media"
                >
                  <IoLogoTwitter size={25} />
                </a>
              </Grid>
              <Grid item>
                <a
                  href="https://instagram.com/akshai_khanna?igshid=NzZlODBkYWE4Ng=="
                  target="_blank"
                  // rel="noopener noreferrer"
                  className="media"
                >
                  <GrInstagram size={25} />
                </a>
              </Grid>
              <Grid item>
                <a
                  href="https://www.linkedin.com/in/akshai-khanna-b-42615a215"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media"
                >
                  <FaLinkedin size={25} />
                </a>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Typography style={{ fontSize: "0.8rem" }}>
          ©2023 Copyright: ShopNow.com
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
