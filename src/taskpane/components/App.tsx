/* eslint-disable no-undef */
import React from "react";
import { Progress } from "./Progress";
import Header from "./Header";
import { Stack } from "@fluentui/react";
import Main from "./Main";

/* global require */

interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

const App: React.FC<AppProps> = ({ title, isOfficeInitialized }) => {
  if (!isOfficeInitialized) {
    return (
      <Progress
        title={title}
        logo={require("./../../../assets/logo-filled.png")}
        message="Please sideload your addin to see app body."
      />
    );
  }

  const addToInvite = (meetingDetails: any) => {
    const mailTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Meeting Invitation</title>
      </head>
      <body>
        <p>You have been invited to an online meeting, powered by Cymbus.</p>
        <p>Attendees joining this meeting must be registered and signed in to Cymbus app.</p>
        <p>Attendees can also join this meeting as a guest user with limited privileges</p>
        <p>Click to join the meeting: <a href="https://d84nn4mcnd090.cloudfront.net/">https://cymbus/1483494588</a></p>
        <p>Meeting ID: <b>${meetingDetails.meetingId}</b></p>
        ${
          meetingDetails.isPasswordEnabled
            ? `<p>This meeting is password enabled. Please use this password <b>${meetingDetails.password}</b> to enter the meet</p>`
            : ""
        }
        <p>A headset is recommended or you may use your computer’s microphone and speakers.</p>
        <p>Download Cymbus at <a href="https://d84nn4mcnd090.cloudfront.net/#:~:text=Download-,Cymbus,-desktop%20app">https://cymbus/download</a></p>
      </body>
    </html>
    `;
    Office.context.mailbox.item.body.prependAsync(mailTemplate, { coercionType: Office.CoercionType.Html }, () => {});
  };

  return (
    <>
      <Stack horizontal horizontalAlign="center" verticalAlign="center">
        <Header title={""} />
      </Stack>
      <Main addInviteHandler={addToInvite} />
    </>
  );
};

export default App;
