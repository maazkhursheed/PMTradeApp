import RNSmtpMailer from "react-native-smtp-mailer";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { getType, PayloadMetaAction } from "typesafe-actions";
import AppConfig from "~root/Config/AppConfig";
import { AppActions } from "~root/Reducers/AppReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { EmailActions, IEmailRequest } from "~root/Reducers/EmailReducers";

export const epicSendEmail: Epic = (action$, state$, { db }: IDependencies) =>
  action$.pipe(
    ofType(getType(EmailActions.emailRequest)),
    mergeMap(async (action: PayloadMetaAction<string, IEmailRequest, any>) => {
      const { fromAddress, subject, templatePath, recipientEmail } = action.payload;
      const params = action.meta;
      return from(
        RNSmtpMailer.sendMail({
          mailhost: AppConfig.SMTP_SERVER_URL,
          port: AppConfig.SMTP_SERVER_PORT,
          ssl: true, // if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
          username: AppConfig.SMTP_SERVER_USERNAME,
          password: AppConfig.SMTP_SERVER_PASSWORD,
          from: fromAddress,
          recipients: recipientEmail,
          subject,
          htmlBody: templatePath(params),
          attachmentPaths: [],
          attachmentNames: [], // only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[]
          attachmentTypes: [], // needed for android, in ios-only application, leave it empty: attachmentTypes:[]. Generally every img(either jpg, png, jpeg or whatever) file should have "img", and every other file should have its corresponding type.
        }),
      ).pipe(
        mergeMap(response => {
          return of(EmailActions.emailSuccess(action.payload.onSuccess));
        }),
        catchError(err => {
          return of(EmailActions.failure(action));
        }),
      );
    }),
    mergeMap(response => {
      return from(response);
    }),
  );

export const epicEmailSuccessListener: Epic = action$ =>
  action$.pipe(
    ofType(getType(EmailActions.emailSuccess)),
    mergeMap(action => {
      if (action.payload) {
        action.payload();
      }
      return of(AppActions.voidAction());
    }),
  );
