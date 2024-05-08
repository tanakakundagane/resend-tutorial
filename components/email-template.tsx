import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  firstMessage: string;
  firstEmail: string;
  firstPhone: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, firstMessage,firstEmail,firstPhone
}) => (
  <div>
    <p>お名前:{firstName}</p>
    <p>メールアドレス:{firstEmail}</p>
    <p>電話番号:{firstPhone}</p>
    <p>お問い合わせ内容:</p>
    <p>{firstMessage}</p>
  </div>
);

