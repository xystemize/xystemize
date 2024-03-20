export const ValidationRule = Object.freeze({
  IdMaxLength: 100,
  NameMaxLength: 255,
  NameMinLength: 1,
  TimezoneMaxLength: 255,
  ShortTextLength: 255,
  LongTextLength: 2000,
  TitleMaxLength: 30,
  DescriptionMaxLength: 500,
  BioTextMaxLength: 500,
  TimestampMaxLength: 13,
  PasswordMinLength: 8,
  UsernameMinLength: 3,
  UsernameMaxLength: 20,
  MediaIdsMinLength: 1,
  MediaIdsMaxLength: 10,
  VideoMediaMaxLength: 1,
  TopCommentIdsMaxLength: 3,
  TopParticipantIdsMaxLength: 3,
  PromoCodeLength: 8,
  PollOptionsMinLength: 2,
  PollOptionsMaxLength: 4,
  PollOptionSelectionMinLength: 1,
  PollOptionSelectionMaxLength: 1,
  TopChatParticipantAccountIdsMaxLength: 4,
  NotificationMinLength: 1,
  MessageMaxLength: 2000,
  PortfolioMaxLength: 10,
  PostTextMaxLength: 500,
  UsernameCharsRegex: /^[a-zA-Z0-9_.\u4e00-\u9eff]+$/,
  ChatMessageMediaItemsMinLength: 1,
  ChatMessageMediaItemsMaxLength: 10,
  EngagementSessionIdsMaxLength: 10,
  InviteCodeFixedLength: 6,
  AppleReceiptMinTransactionLength: 1,
  MaxEventMediaItems: 1,
  ActionMinLength: 1,
  EventTitleMaxLength: 40,
});
