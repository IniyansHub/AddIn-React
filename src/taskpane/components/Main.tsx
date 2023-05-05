/* eslint-disable no-console */
import { IStackProps, Label, PrimaryButton, Stack, TextField, Toggle } from "@fluentui/react";
import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup";
import React from "react";

const meetingIdOptions: IChoiceGroupOption[] = [
  { key: "new", text: "Generate a new ID" },
  { key: "existing", text: "Personal Meeting ID: 7941 35 4959" },
];

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 10, padding: 10 },
};

// eslint-disable-next-line react/prop-types
const Main = ({ addInviteHandler }) => {
  const [isPasswordEnabled, setPasswordEnabled] = React.useState(false);
  const [meetingId, setmeetingId] = React.useState<string | undefined>("7941354959");
  const [password, setPassword] = React.useState<string | undefined>("");
  const [isWaitingRoomEnabled, setWaitingRoomEnablement] = React.useState(false);
  const [meetingDetails, setMeetingDetails] = React.useState({
    meetingId: meetingId,
    isPasswordEnabled: isPasswordEnabled,
    isWaitingRoomEnabled: false,
    password: password,
  });

  function _onChangeId(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    ev.preventDefault();
    if (option.key == "new") {
      let generatedId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setmeetingId(generatedId);
      meetingDetails.meetingId = generatedId;
      setMeetingDetails({ ...meetingDetails });
    } else {
      setmeetingId("7941354959");
      meetingDetails.meetingId = "7941354959";
      setMeetingDetails({ ...meetingDetails });
    }
  }

  function onPasswordChange(_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, password?: string) {
    setPassword(password);
    setMeetingDetails({ ...meetingDetails, password });
  }

  function onPasswordEnable(_ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
    setPasswordEnabled(checked);
    meetingDetails.isPasswordEnabled = checked;
    setMeetingDetails({ ...meetingDetails });
  }

  function onWaitingRoomEnable(_ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
    setWaitingRoomEnablement(checked);
    meetingDetails.isWaitingRoomEnabled = checked;
    setMeetingDetails({ ...meetingDetails });
  }

  const onAddToInviteClick = () => {
    addInviteHandler(meetingDetails);
  };

  return (
    <>
      <Stack {...columnProps}>
        <Stack>
          <Label>Select the meeting ID to use</Label>
          <ChoiceGroup defaultSelectedKey="new" options={meetingIdOptions} onChange={_onChangeId} />
        </Stack>
        <Stack>
          <Toggle
            label="Waiting Room"
            inlineLabel
            defaultChecked={isWaitingRoomEnabled}
            onChange={onWaitingRoomEnable}
          />
        </Stack>
        <Stack>
          <Toggle onChange={onPasswordEnable} inlineLabel label="Enable Password" />
        </Stack>
        <Stack horizontal>
          {isPasswordEnabled && (
            <TextField
              styles={{ root: { width: "100%" } }}
              placeholder="Enter Password"
              value={password}
              onChange={onPasswordChange}
              errorMessage="please enter password"
            />
          )}
        </Stack>
        <Stack horizontal horizontalAlign="center">
          <PrimaryButton text="Add to invite" allowDisabledFocus onClick={onAddToInviteClick} />
          {/* <PrimaryButton text="Schedule Meeting" allowDisabledFocus /> */}
        </Stack>
      </Stack>
    </>
  );
};

export default Main;
