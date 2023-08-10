import { ActionsObservable, StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { first, last } from "rxjs/operators";
import {
  epicAddOwnProduct,
  epicChangeQuoteStatus,
  epicCreateLabourCost,
  epicDefaultDisplayOptionsForQuotes,
  epicDeleteLabourCost,
  epicDeleteQuote,
  epicDeleteQuoteMedia,
  epicDeleteQuoteProduct,
  epicGetCompanyDetails,
  epicGetQuoteMedia,
  epicGetQuoteProducts,
  epicMarkComplete,
  epicNewJob,
  epicQuotesList,
  epicQuotesListDetails,
  epicSendEmailQuote,
  epicSwapProduct,
  epicUpdateLabourCost,
  epicUpdateQuoteCompanyDetails,
  epicUpdateQuoteDetails,
  epicUpdateQuoteJobStatus,
  epicUpdateQuoteMarkupPercent,
  epicUpdateQuoteMedia,
  epicUpdateQuoteProductQuantity,
  epicuploadImageFileToQuote,
} from "~root/Epics/QuotesEpic/index";
import { EnumQuoteType } from "~root/Lib/QuoteHelper";
import { AppState } from "~root/Lib/TestHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import Api from "~root/Services/Api";

const token = "";
const aceToken = "";
const auth0Token = "";
const email = "";

describe("Quotes Epics", () => {
  const api = Api.create;

  beforeEach(() => {
    api.hybris.setAuthorization(token, aceToken, auth0Token, email);
  });

  test("call success type when call estimates list epic", done => {
    const requestAction = QuotesActions.requestQuotesList({ pageNo: 1, numberOfLines: 500 }, { onSuccess: () => {}, onFailure: () => {} });
    const action$ = ActionsObservable.of(requestAction);
    epicQuotesList(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("QUOTES_LIST_SUCCESS");
      done();
    });
  });

  test("call success type when call estimates list details epic", done => {
    const requestAction = QuotesActions.requestQuotesListDetails({ quoteId: "01985019" }, { onSuccess: () => {}, onFailure: () => {} });
    const action$ = ActionsObservable.of(requestAction);
    epicQuotesListDetails(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("QUOTES_LIST_DETAILS_SUCCESS");
      done();
    });
  });

  test("call success type when call update quantity list epic", done => {
    const requestAction = QuotesActions.requestQuoteProducts(
      {
        email: "shashika.abeysuriya@fbu.com",
        hybristoken: token,
        tradeaccount: "362ANTGA",
        jobaccount: "362ANTGA",
        parentbranch: 362,
        fulfillmentbranch: 362,
      },
      { onSuccess: () => {}, onFailure: () => {} },
    );
    const action$ = ActionsObservable.of(requestAction);
    epicGetQuoteProducts(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("QUOTE_PRODUCTS_SUCCESS");
      done();
    });
  });

  test("call success type when call update quote product quantity", done => {
    const requestAction = QuotesActions.updateProductQuantity(
      {
        urlParams: { quoteId: "01985019", entryNumber: 5 },
        bodyParams: {
          quantity: 1,
          decimalQty: 1,
          product: { code: "custom", name: "NEWBA", description: "FDERF", unitCode: "JH" },
          basePrice: { value: "1.34" },
          customProductFlag: "true",
        },
      },
      { onSuccess: () => {}, onFailure: () => {} },
    );
    const action$ = ActionsObservable.of(requestAction);
    epicUpdateQuoteProductQuantity(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("UPDATE_QUOTE_PRODUCT_QUANTITY_SUCCESS");
        done();
      });
  });

  test("call success type when delete quote product", done => {
    const requestAction = QuotesActions.deleteQuoteProduct(
      {
        urlParams: { quoteId: "01985019", entryNumber: 5 },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicDeleteQuoteProduct(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("REQUEST_QUOTES_LIST_DETAILS");
        done();
      });
  });

  test("call success type when add new product epic", done => {
    const requestAction = QuotesActions.addOwnProduct(
      {
        urlParams: { quoteId: "01985019" },
        bodyParams: {
          quantity: 1,
          decimalQty: 1,
          product: { code: "custom", name: "NEWBA", description: "FDERF", unitCode: "JH" },
          basePrice: { value: "1.34" },
          customProductFlag: "true",
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicAddOwnProduct(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("ADD_OWN_PRODUCT_SUCCESS");
        done();
      });
  });

  test("call success type when product are swapped epic", done => {
    const requestAction = QuotesActions.swapProduct(
      {
        urlParams: { quoteId: "01985019" },
        bodyParams: {
          quantity: 1,
          decimalQty: 1,
          product: { code: "custom", name: "NEWBA", description: "FDERF", unitCode: "JH" },
          basePrice: { value: "1.34" },
          customProductFlag: "true",
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicSwapProduct(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("SWAP_PRODUCT_SUCCESS");
        done();
      });
  });

  test("call success type when update quote markup percentage", done => {
    const requestAction = QuotesActions.updateQuoteMarkupPercent({ code: "00191001" });
    const action$ = ActionsObservable.of(requestAction);
    epicUpdateQuoteMarkupPercent(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("UPDATE_QUOTE_MARKUP_PERCENT_SUCCESS");
      done();
    });
  });

  test("call success type when add new job epic", done => {
    const requestAction = QuotesActions.addNewJob(
      {
        code: "123112",
        jobAddress: {
          firstName: "Allens Fence",
          country: {
            isocode: "NZ",
          },
          line1: "Tairua",
          line2: "167 Duke St",
          postalCode: "1231",
          town: "Tairua",
        },
        consumerAddress: {
          firstName: "Allens Fence",
          phone: "2312312112",
          email: "shashika.abeysuriya@fbu.com",
          country: {
            isocode: "NZ",
          },
          line1: "Tairua",
          line2: "167 Duke St",
          postalCode: "1231",
          town: "Tairua",
        },
        estimateFlag: "false",
        channel: "Trade App",
        termsAndConditions: "",
        notes: "test",
        scopeOfWork: "",
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicNewJob(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("ADD_NEW_JOB_SUCCESS");
        done();
      });
  });
  test("call success type when edit customer details", done => {
    const requestAction = QuotesActions.updateQuoteDetails(
      {
        urlParams: {},
        bodyParams: {
          code: "00188001",
          jobAddress: {
            firstName: "Allens Fence",
            country: {
              isocode: "NZ",
            },
            line1: "Tairua",
            line2: "167 Duke St",
            postalCode: "3544",
            town: "Tairua",
          },
          consumerAddress: {
            firstName: "Test Allens Fence",
            phone: "1234567890",
            email: "shashika.abeysuriya@fbu.com",
            country: {
              isocode: "NZ",
            },
            line1: "Test_Tairua",
            line2: "Test_167 Duke St",
            postalCode: "3544",
            town: "Tairua",
          },
          estimateFlag: "false",
          channel: "Trade Portal",
          termsAndConditions: "",
          notes: "House end of the street",
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicUpdateQuoteDetails(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("UPDATE_QUOTE_DETAILS_SUCCESS");
        done();
      });
  });

  test("call success type when update job status", done => {
    const requestAction = QuotesActions.updateQuoteJobStatus(
      {
        urlParams: { quoteId: "01985019" },
        bodyParams: {
          status: "WON",
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicUpdateQuoteJobStatus(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("UPDATE_QUOTE_JOB_STATUS_SUCCESS");
        done();
      });
  });

  test("call success type when add/update company details", done => {
    const requestAction = QuotesActions.updateQuoteCompanyDetails(
      {
        urlParams: {},
        bodyParams: {
          profile: {
            companyAddress: {
              email: "henry@gmail.com",
              phone: "0647364773",
              companyName: "Henry Mark Company pvt.ltd",
              country: {
                isocode: "NZ",
              },
              line1: "777 Acacia Bay Road",
              line2: "Acacia Bay",
              postalCode: "3330",
              town: " Taupo District",
            },
            termsAndConditions: "sample terms",
            paymentTerms: "test payment terms",
          },
          file: {
            file: "file:///storage/emulated/0/Pictures/shj15791-4v61-67g6-z1b6-v8451z956j5k.png",
            type: "image/png",
            name: "test_company_logo",
          },
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicUpdateQuoteCompanyDetails(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("UPDATE_QUOTE_COMPANY_DETAILS_SUCCESS");
        done();
      });
  });

  test("call success type when create Labour / other cost epic", done => {
    const requestAction = QuotesActions.createLabourCost(
      {
        urlParams: {
          quoteId: "123112",
          costType: "Labour",
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicCreateLabourCost(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(first())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("CREATE_LABOUR_COST_SUCCESS");
        done();
      });
  });

  test("call success type when delete Labour / other cost epic", done => {
    const requestAction = QuotesActions.deleteLabourCost(
      {
        urlParams: {
          quoteId: "123112",
          costType: "Labour",
          name: "Cost Name",
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicDeleteLabourCost(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(first())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("DELETE_LABOUR_COST_SUCCESS");
        done();
      });
  });

  test("call success type when get company details epic", done => {
    const requestAction = QuotesActions.requestCompanyDetails({ quoteId: "12345" }, {});
    const action$ = ActionsObservable.of(requestAction);
    epicGetCompanyDetails(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("COMPANY_DETAILS_SUCCESS");
      done();
    });
  });
  test("call success type when update Labour / other cost epic", done => {
    const requestAction = QuotesActions.updateLabourCost(
      {
        urlParams: {
          quoteId: "123112",
          costType: "Labour",
        },
        bodyParams: {
          name: "Other cost name",
          price: "10",
          quantity: "10",
          notes: "Additional Notes",
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicUpdateLabourCost(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("UPDATE_LABOUR_COST_SUCCESS");
        done();
      });
  });

  test("call success type when get mark complete epic", done => {
    const requestAction = QuotesActions.requestMarkCompleted({ quoteId: "12345", allProductsAdded: true }, {});
    const action$ = ActionsObservable.of(requestAction);
    epicMarkComplete(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("MARK_COMPLETE_SUCCESS");
        done();
      });
  });
  test("call success  when send email quote", done => {
    const requestAction = QuotesActions.sendEmailQuote(
      {
        urlParams: {
          quoteId: "123112",
        },
        bodyParams: {
          toAddress: "to@royalcyber.com;toaddress@gmail.com",
          ccAddress: "cc@royalcyber.com;ccaddress@gmail.com",
          subject: "Email subject",
          body: "Email body",
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicSendEmailQuote(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("SEND_EMAIL_QUOTE_SUCCESS");
        done();
      });
  });
  test("call success type when change quote status", done => {
    const requestAction = QuotesActions.changeQuoteStatus(
      {
        quoteId: "01985019",
        status: EnumQuoteType.NotSent,
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicChangeQuoteStatus(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("CHANGE_QUOTE_STATUS_SUCCESS");
        done();
      });
  });

  test("call success when user uploads quote media", done => {
    const requestAction = QuotesActions.uploadImageFileToQuote(
      {
        bodyParams: { file: "", quoteId: "01234567" },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    const state$ = {};
    epicuploadImageFileToQuote(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("UPLOAD_IMAGE_FILE_TO_QUOTE_SUCCESS");
        done();
      });
  });

  test("call success when user views quote media list", done => {
    const requestAction = QuotesActions.getQuoteMedia(
      {
        params: { quoteId: "01234567" },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    const state$ = {};
    epicGetQuoteMedia(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("GET_QUOTE_MEDIA_SUCCESS");
        done();
      });
  });

  test("call success when user views the quotes display options", done => {
    const requestAction = QuotesActions.requestDefaultDisplayOptionsForQuotes({ params: { quoteId: "01234567" } });
    const action$ = ActionsObservable.of(requestAction);
    epicDefaultDisplayOptionsForQuotes(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("DISPLAY_OPTIONS_QUOTES_SUCCESS");
        done();
      });
  });

  test("call success when user delete quote media", done => {
    const requestAction = QuotesActions.deleteQuoteMedia({ quoteId: "01234567", quoteMediaPK: "12345" }, {});
    const action$ = ActionsObservable.of(requestAction);
    epicDeleteQuoteMedia(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("DELETE_QUOTE_MEDIA_SUCCESS");
      done();
    });
  });

  test("call success when user updates the quotes display options", done => {
    const requestAction = QuotesActions.requestDefaultDisplayOptionsForQuotes({
      params: { quoteId: "01234567" },
      bodyParams: {
        viewRetailsPrice: true,
        viewCostBreakdown: false,
        viewSectionBreakdown: false,
        viewIncludeImages: true,
        viewIncludeFiles: false,
      },
    });
    const action$ = ActionsObservable.of(requestAction);
    epicDefaultDisplayOptionsForQuotes(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe("DISPLAY_OPTIONS_QUOTES_SUCCESS");
      done();
    });
  });

  test("call success when user update quote media", done => {
    const requestAction = QuotesActions.updateQuoteMedia({ quoteId: "01234567", quoteMediaPK: "12345", bodyParams: { mediaSelected: true } }, {});
    const action$ = ActionsObservable.of(requestAction);
    epicUpdateQuoteMedia(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(first())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("UPDATE_QUOTE_MEDIA_SUCCESS");
        done();
      });
  });

  test("call success type when delete quote epic", done => {
    const requestAction = QuotesActions.deleteQuote(
      {
        urlParams: {
          quoteId: "02920162",
        },
      },
      {},
    );
    const action$ = ActionsObservable.of(requestAction);
    epicDeleteQuote(action$, new StateObservable<RootState>(new Subject<RootState>(), AppState), { api })
      .pipe(last())
      .subscribe(actionReceived => {
        expect(actionReceived.type).toBe("DELETE_QUOTE_SUCCESS");
        done();
      });
  });
});
