import "../css/checkout.css";
export default function Checkout() {
  return (
    <section className="checkout ">
      <div className="padding checkout_page">
        <div className="top-checkout">
          <div>← Back to Cart</div>
          <h1>Checkout</h1>
        </div>
        <div className="down-checkout">
          <div className="checkout_details">
            <div className="shipping_info">
              <div className="si_heading">
                <div>Shipping Information</div>
                <span></span>
              </div>
              <div className="si_name">
                <div className="si_group">
                  <label for="checkout_first_name">First Name</label>
                  <input
                    className="si_input"
                    name="checkoout_first_name"
                    id="checkout_first_name"
                    type="text"
                    placeholder="Ram"
                  ></input>
                </div>
                <div className="si_group">
                  <label>Last Name</label>
                  <input
                    className="si_input"
                    name="checkout_last_name"
                    type="text"
                    placeholder="Kafle"
                  ></input>
                </div>
              </div>
              <div className="si_email si_group">
                <label for="checkout_email">Email</label>
                <input
                  type="email"
                  className="si_input"
                  name="checkout_email"
                  id="checout_email"
                  placeholder="Ram@gmail.com"
                ></input>
              </div>
              <div className="si_phone si_group">
                <label for="checkout_phone">Phone</label>
                <input
                  className="si_input"
                  name="checkout_phone"
                  id="checkout_phone"
                  type="phone"
                  placeholder="+977-970-2632440"
                ></input>
              </div>
              <div className="si_address si_group">
                <label for="checkout_address">Address</label>
                <input
                  type="text"
                  className="si_input"
                  name="checkout_address"
                  id="checkout_address"
                  placeholder="Bargachhi-1"
                ></input>
              </div>
              <div className="city_zip">
              <div className="si_group">
                <label for="checkout_city">city</label>
                <input
                  className="si_input"
                  name="checkout_city"
                  id="checkout_city"
                  type="text"
                  placeholder="Biratnagar"
                ></input>
              </div>
              <div className="si_group">
                <label for="checkout_zip">Zip</label>
                <input
                  className="si_input"
                  type="text"
                  name="checkout_zip"
                  id="checkout_zip"
                />
              </div>
            </div>
            </div>
            <div className="hr">
              
            </div>
          </div>
          <div className="order_summary2">
            <div className="os2_card"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
