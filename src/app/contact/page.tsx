"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [page, setPage] = useState('form'); // form, confirm, submit, complete

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleConfirm = (event: React.FormEvent) => {
    event.preventDefault();
    setPage('confirm');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setPage('complete'); // Change page to show completion message
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました');
    }
  };

  const handleEdit = () => {
    setPage('form');
  };

  return (
    <>
      <Link href="/">ホーム</Link>
      {page === 'form' && (
        <form onSubmit={handleConfirm}>
          <div>
            <label>お名前</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label>メールアドレス</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label>電話番号</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <label>お問い合わせ内容</label>
            <textarea name="message" value={formData.message} onChange={handleChange} />
          </div>
          <button type="submit">確認</button>
        </form>
      )}
      {page === 'confirm' && (
        <div>
          <h2>確認ページ</h2>
          <p>お名前: {formData.name}</p>
          <p>メールアドレス: {formData.email}</p>
          <p>電話番号: {formData.phone}</p>
          <p>お問い合わせ内容: {formData.message}</p>
          <button onClick={handleSubmit}>送信</button>
          <button onClick={handleEdit}>訂正</button>
        </div>
      )}
      {page === 'complete' && (
        <div>
          <h2>送信完了</h2>
          <p>お問い合わせいただきありがとうございます。</p>
          <p>内容を確認のうえ、返信させていただきます。</p>
          <Link href="/">ホームに戻る</Link>
        </div>
      )}
    </>
  );
}

export default Page;