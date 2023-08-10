interface OwnProps {
  customerMsg: string;
  instruction: string;
  accountName: string;
  invoiceTo: string;
  jobNo: string;
  orderNo: string;
  originalOrder: [];
  userName: string;
  phone: string;
  email: string;
}

const ChangeOrderItemTemplate = (data: OwnProps) => {
  const { customerMsg, instruction, accountName, invoiceTo, jobNo, orderNo, originalOrder, userName, phone, email } = data;

  return `

<body class="em_body" style="margin:0px auto; padding:0px;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mktoContainer em_full_wrap" id="Template" bgcolor="#d9d9d9">
      <tbody><tr class="mktoModule" mktoname="Header_PM_Generic_Logo_Section" id="Header_PM_Generic_Logo_Section4f6ad767-0d1c-4e41-8cec-df30b3900618">
        <td valign="top" align="center">
          <table align="center" width="600" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:600px; table-layout:fixed;" bgcolor="#ffffff">
            <tbody>
              <tr>
                <td width="100%" valign="top" align="left" bgcolor="#003976" style="padding:0;" class="em_aside">
                  <div id="Header_logo_224px4f6ad767-0d1c-4e41-8cec-df30b3900618" mktoname="Image" class="mktoImg">
                    <img src="https://www.placemakers.co.nz/media/64876/header-telesale.png" width="600" class="header_image" alt="PlaceMakers®" border="0" style="display:block; max-width:600px; font-family: Arial, sans-serif; font-size:14px; line-height:18px; color:#ffffff; font-weight:bold;">
                    </div></td>
              </tr>
            </tbody>
          </table></td>
      </tr>
      <tr class="mktoModule" mktoname="With_blue_Hi_Name_Title_Section" id="With_blue_Hi_Name_Title_Section">
        <td valign="top" align="center">
          <table align="centre" width="600" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:600px; table-layout:fixed;" bgcolor="#ffffff">
            <tbody>
              <tr>
                <td align="center" valign="top" style="padding:0px 25px;" class="em_aside10">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td class="em_defaultlink " align="left" valign="top" style=" font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:12px; line-height:20px; color:#555555; font-weight:700; padding:10px 0 5px 0;">
                          <div id="Content_Text2" mktoname="Content text" class="account_name">
                            Some items are changed for the order #${orderNo}. Please adjust the order accordingly.
                          </div></td>
                      </tr>
                      <tr>
                        <td class="em_defaultlink " align="left" valign="top" style=" font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:12px; line-height:20px; color:#000000; font-weight:700; padding:10px 0 5px 0;">
                          <div id="Content_Text2" mktoname="Content text" class="job_name">
                            Order Details and changes:
                            <div></div></div></td>
                      </tr>
                    </tbody>
                  </table>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" align="left" style="margin:10px 0 15px 0;">
                    <tbody>
                    <tr>
                     <td width="40%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                        <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                        <span style="color:#0F366D; text-transform:uppercase;">  <strong>Change requested by:</strong></span>
                        </div>
                     </td>
                     <td width="60%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                        <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                        <div class="po_number">${userName}, ${phone}, ${email}</div>
                        </div>
                     </td>
                    </tr>
                      <tr>
                        <td width="40%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                         <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                            <span style="color:#0F366D; text-transform:uppercase;">  <strong>Order Number:</strong></span>
                         </div>
                      </td>
                          <td width="60%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                            <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                              <div class="po_number">${orderNo}</div>
                            </div>
                          </td>
                      </tr>
                      <tr>
                        <td width="40%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                         <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                            <span style="color:#0F366D; text-transform:uppercase;">  <strong>Order Placed for Acc:</strong></span>
                         </div>
                      </td>
                          <td width="60%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                            <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                              <div class="po_number">${accountName}</div>
                            </div>
                          </td>
                      </tr>
                      <tr>
                        <td width="40%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                         <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                            <span style="color:#0F366D; text-transform:uppercase;">  <strong>Job Number:</strong></span>
                         </div>
                      </td>
                          <td width="60%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                            <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                              <div class="po_number">${jobNo}</div>
                            </div>
                          </td>
                      </tr>
                      <tr>
                        <td width="40%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                         <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                            <span style="color:#0F366D; text-transform:uppercase;">  <strong>Invoice To:</strong></span>
                         </div>
                      </td>
                          <td width="60%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                            <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                              <div class="po_number">${invoiceTo}</div>
                            </div>
                          </td>
                      </tr>
                      <tr>
                        <td width="40%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                         <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                            <span style="color:#0F366D; text-transform:uppercase;">  <strong>Requested Changes:</strong></span>
                         </div>
                      </td>
                          <td width="60%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                            <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                              <div class="po_number">
                              ${customerMsg}
                              </div>
                            </div>
                          </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="requested_change_title" width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin:0px 0 0px 0;">
                          <tbody>
                            <tr>
                              <td class="em_defaultlink" align="left" valign="top" style="font-weight:700; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; color:#0F366D; padding: 0 0 0 5px;">
                                <div id="Content_Text3" mktoname="Content text" class="order-item">
                                  ORIGINAL ORDER:
                                </div>
                              </td>
                              </tr>
                        </tbody>
                      </table>
                  <table class="order_item_table" width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin:10px 0 10px 0;">
                    <tbody>
                      <tr>
                        <td width="10%" class="em_defaultlink" align="left" valign="top" style="text-transform:uppercase; font-weight:700; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; background-color:#ffffff; color:#0F366D; padding:5px;border-top:1px solid #12b4cc; border-bottom:1px solid #12b4cc;">
                          <div id="Content_Text3" mktoname="Content text" class="line-number">
                          Ln.
                          </div>
                        </td>
                        <td width="20%" class="em_defaultlink" align="left" valign="top" style="text-transform:uppercase; font-weight:700; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; background-color:#ffffff; color:#0F366D; padding:5px;border-top:1px solid #12b4cc; border-bottom:1px solid #12b4cc;">
                          <div id="Content_Text3" mktoname="Content text" class="order-item">
                          Product
                          </div>
                        </td>
                        <td width="40%" class="em_defaultlink" align="left" valign="top" style="text-transform:uppercase; font-weight:700; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; background-color:#ffffff; color:#0F366D; padding:5px;border-top:1px solid #12b4cc; border-bottom:1px solid #12b4cc;">
                          <div id="Content_Text3" mktoname="Content text" class="order-item">
                          Description
                          </div>
                        </td>
                        <td width="20%" class="em_defaultlink" align="left" valign="top" style="text-transform:uppercase; font-weight:700; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; background-color:#ffffff; color:#0F366D; padding:5px;border-top:1px solid #12b4cc; border-bottom:1px solid #12b4cc;">
                          <div id="Content_Text3" mktoname="Content text" class="order-mou">
                            Quantity
                            </div>
                          </td>
                        <td width="10%" class="em_defaultlink" align="left" valign="top" style="text-transform:uppercase; font-weight:700; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; background-color:#ffffff; color:#0F366D; padding:5px;border-top:1px solid #12b4cc; border-bottom:1px solid #12b4cc;">
                            <div id="Content_Text3" mktoname="Content text" class="order-mou">
                              UOM
                              </div>
                            </td>
                      </tr>
                    </tbody>
                  </table>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style=" margin:10px 0 10px 0; border-bottom:1px solid #12b4cc;">
                        <tbody>
                    ${originalOrder.map(function (data: any, index: any) {
                      return `
    <tr>
                        <td width="10%" class="em_defaultlink" align="left" valign="top" style="text-transform:uppercase; font-weight:700; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; background-color:#ffffff; color:#0F366D; padding:5px;">
                          <div id="Content_Text3" mktoname="Content text" class="line-number">
                         ${++index}
                          </div>
                        </td>
                        <td width="20%" class="em_defaultlink" align="left" valign="top" style="font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; color:#000000; padding: 5px 0 5px 5px;">
                          <div class="sku_prod">${data.sku}</div>
                          </td>
                          <td width="40%" class="em_defaultlink" align="left" valign="top" style=" font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; color:#000000; padding: 5px 0 5px 5px; ">
                            <div id="Content_Text3" mktoname="Content text" class="order-item">
                            ${data.detail}
                          </div>
                          </td>
                                <td width="20%" class="em_defaultlink" align="left" valign="top" style=" font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; color:#000000; padding: 5px 0 5px 5px;">
                                                          <div id="Content_Text3" mktoname="Content text" class="order-quantity">
                                                        ${data.quantity}
                                                          </div>
                                                    </td>
                                <td width="10%" class="em_defaultlink" align="left" valign="top" style=" font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; color:#000000; padding: 5px 0 5px 5px;">
                                                                                          <div id="Content_Text3" mktoname="Content text" class="order-quantity">
                                                                                        ${data.uom}
                                                                                          </div>
                                                                                    </td>

                          </tr>`;
                    })}
                    </tbody>
                  </table>
                  <table class="delivery_instructions" width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin:10px 0 10px 0;border-bottom:1px solid #12b4cc">
                      <tbody>
                        <tr>
                          <td class="em_defaultlink" align="left" valign="top" style="font-weight:700; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; color:#000000; padding: 5px 0 5px 5px;">
                            <div id="Content_Text3" mktoname="Content text" class="order-item">
                            Delivery Instructions:
                            </div></td>
                          </tr>
                          <tr>
                            <td class="em_defaultlink" align="left" valign="top" style=" font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:18px; color:#555555; padding: 5px 0 5px 5px;">
                              <div id="Content_Text3" mktoname="Content text" class="order-mou">
                              ${instruction}
                              </div></td>
                        </tr></tbody>
                      </table>
                </td>
              </tr>
            </tbody>
          </table></td>
      </tr>
      <tr class="mktoModule" mktoname="Footer_Generic_PM_logo_Section" id="Footer_Generic_PM_logo_Section">
            <td valign="top" align="center">
              <table align="center" width="600" border="0" cellspacing="0" cellpadding="0" class="em_main_table"
                     style="width:600px; height: 40px; table-layout:fixed;" bgcolor="#ffffff">
                <tbody>
                <tr>
                  <td class="em_aside10" align="center" valign="top" bgcolor="#003876" style="padding:0px 25px;">
                    <div style="margin-top: 10px; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:13px;  color:#FFFFFF;"
                                       id="Content_Text56" mktoname="Content text" class="mktoText">
                      <a href="https://www.placemakers.co.nz/" style="color: #FFFFFF">PlaceMakers.co.nz</a> | <a href="https://tradeportal.placemakers.co.nz/" style="color: #FFFFFF">Trade Portal</a> | <a href="https://www.placemakers.co.nz/terms-of-trade/" style="color: #FFFFFF">Terms of Trade</a> |
                      <a href="https://www.placemakers.co.nz/privacy-policy/" style="color: #FFFFFF">Privacy Policy</a>

                    </div>
                    <div
                      style="margin-top: 5px; font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:10px; line-height:13px;  color:#FFFFFF; padding-bottom:10px;"
                      id="Content_Text56" mktoname="Content text" class="mktoText"> © 2020 PlaceMakers, New Zealand
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
    </tbody></table>
</body>
`;
};
export default ChangeOrderItemTemplate;
