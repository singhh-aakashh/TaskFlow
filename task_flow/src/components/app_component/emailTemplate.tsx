"use client"
import React, { useState, useEffect } from 'react';

import { fetchEmailTemplate } from '@/lib/db/db';
import Link from 'next/link';



const EmailTemplates = ({nodeId}:{nodeId:string}) => {
  // Sample data for email templates (replace with API call if needed)
  const [emailTemplates, setEmailTemplates] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchTemplates = async() =>{
      const templates= await fetchEmailTemplate();
      console.log(templates)
   if(templates) setEmailTemplates(templates);
    } 
    fetchTemplates()
  }, []);

  return (
    <div className="flex flex-col items-center overflow-scroll h-screen w-full space-y-4 text-white">
        {
            emailTemplates.map((template)=>
              <Link href={`/email-template/${template?.id}?nodeId=${nodeId}`}>
                <img src={template?.img} className={`w-64 h-72  cursor-pointer bg-cover bg-center`}/>
                </Link>)
        }
      </div>
  );
};

export default EmailTemplates;