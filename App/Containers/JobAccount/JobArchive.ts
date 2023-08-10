interface OwnProps {
  email: string;
  phone: string;
  userName: string;
  jobId: string;
  firstName: string;
  accountId: string;
}

const JobArchiveTemplate = (data: OwnProps) => {
  const { email, phone, userName, jobId, firstName, accountId } = data;

  return `
    <body class="em_body" style="margin:0px auto; padding:0px;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mktoContainer em_full_wrap" id="Template"
           bgcolor="#d9d9d9">
      <tbody>
      <tr class="mktoModule" mktoname="Header_PM_Generic_Logo_Section"
          id="Header_PM_Generic_Logo_Section4f6ad767-0d1c-4e41-8cec-df30b3900618">
        <td valign="top" align="center">
          <table align="center" width="600" border="0" cellspacing="0" cellpadding="0" class="em_main_table"
                 style="width:600px; table-layout:fixed;" bgcolor="#ffffff">
            <tbody>
            <tr>
              <td width="100%" valign="top" align="left" bgcolor="#003976" style="padding:0;" class="em_aside">
                <div id="Header_logo_224px4f6ad767-0d1c-4e41-8cec-df30b3900618" mktoname="Image" class="mktoImg">
                  <img src="https://www.placemakers.co.nz/media/64876/header-telesale.png" width="600" class="header_image"
                       alt="PlaceMakers®" border="0"
                       style="display:block; max-width:600px; font-family: Arial, sans-serif; font-size:14px; line-height:18px; color:#ffffff; font-weight:bold;">
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr class="mktoModule" mktoname="With_blue_Hi_Name_Title_Section" id="With_blue_Hi_Name_Title_Section">
        <td valign="top" align="center">
          <table align="centre" width="600" border="0" cellspacing="0" cellpadding="0" class="em_main_table"
                 style="width:600px; table-layout:fixed;" bgcolor="#ffffff">
            <tbody>
            <tr>
              <td align="center" valign="top" style="padding:0px 25px;" class="em_aside10">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                  <tbody>
                  <tr>
                    <td class="em_defaultlink " align="left" valign="top"
                        style=" font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:12px; line-height:20px; color:#555555; font-weight:700; padding:10px 0 5px 0;">
                      <div id="Content_Text2" mktoname="Content text" >
                        ${userName} for  <u>${accountId}</u> requested the job: <u>${jobId}</u> to be archived. Please make this account inactive in ACE.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="em_defaultlink " align="left" valign="top"
                        style=" font-family:'ProximaNova-Bold', Arial, sans-serif; font-size:12px; line-height:20px; color:#000000; font-weight:700; padding:10px 0 5px 0;">
                      <div id="Content_Text2" mktoname="Content text" >
                        Job Details:
                        <div></div>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" align="left" style="margin:10px 0 15px 0;">
                  <tbody>
                  <tr>
                    <td width="40%" class="em_defaultlink" align="left" valign="top"
                        style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                      <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                        <span style="color:#0F366D; text-transform:uppercase;">  <strong>JOB  NUMBER:</strong></span>
                      </div>
                    </td>
                    <td width="60%" class="em_defaultlink" align="left" valign="top"
                        style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                      <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                        <div class="po_number">${jobId}</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%" class="em_defaultlink" align="left" valign="top"
                        style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                      <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                        <span style="color:#0F366D; text-transform:uppercase;">  <strong>REQUESTED BY:</strong></span>
                      </div>
                    </td>
                    <td width="60%" class="em_defaultlink" align="left" valign="top"
                        style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                      <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                        <div class="po_number">${userName}, ${phone}, ${email} </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%" class="em_defaultlink" align="left" valign="top"
                        style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                      <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                       <span style="color:#0F366D; text-transform:uppercase;">  <strong>ACCOUNT NAME:</strong></span>
                      </div>
                    </td>
                    <td width="60%" class="em_defaultlink" align="left" valign="top"
                        style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                      <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                       <div class="po_number">${accountId}</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%" class="em_defaultlink" align="left" valign="top"
                        style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                      <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                        <span style="color:#0F366D; text-transform:uppercase;">  <strong>CUSTOMER REQUESTED</strong></span>
                      </div>
                    </td>
                    <td width="60%" class="em_defaultlink" align="left" valign="top"
                        style="font-family:'ProximaNova-Bold', Arial, sans-serif;font-size:10px;line-height:18px;color:#555555;padding: 5px;">
                      <div id="Content_Text3" mktoname="Content text" class="order_delivery_address">
                         <div class="po_number">Hi,</div>
                         <div class="po_number">
                          Can you please archive this job and send all the remaining invoices for this job.
                         </div>
                         <br>
                         <div class="po_number">
                          Thanks a lot
                         </div>
                         <div class="po_number">
                          ${firstName}
                         </div>
                      </div>
                    </td>

                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
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
      </tbody>
    </table>


    </body>


`;
};

export default JobArchiveTemplate;
