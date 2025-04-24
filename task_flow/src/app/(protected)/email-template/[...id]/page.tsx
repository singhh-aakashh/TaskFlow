"use client";
import { fetchTemplateVariables } from "@/lib/db/db";
import { useFlow } from "@/lib/store/flowStore";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const flow = useFlow();
  const router = useRouter();
  const searchParam =useSearchParams();
  const nodeId = searchParam.get('nodeId');
  console.log("flow is",flow)
  const [rawTemplate, setRawTemplate] = useState<string>("");
  const [emailTemp, setEmailTemp] = useState<string>("");
  const [variables, setVariables] = useState<Record<string, string>>({});

  const { id }: { id: string[] } = useParams();

  useEffect(() => {
    const loadTemplateVariables = async () => {
      const res = await fetchTemplateVariables(id[0]);
      if (res) {
        setRawTemplate(res?.emailTemplate || ""); // Store the raw template from DB
        if (res?.templateVariables) {
          setVariables(
            Object.entries(res.templateVariables).reduce((acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            }, {} as Record<string, string>)
          );
        }
      }
    };
    loadTemplateVariables();
  }, [id]);

  useEffect(() => {
    const filled = rawTemplate.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] || "");
    setEmailTemp(filled);
  }, [variables, rawTemplate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariables((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick =()=>{
   if(nodeId) flow.setActionData(nodeId,emailTemp);
    router.push("/flow/create")
  }
  return (
    <div className="p-4 w-full flex">
      {/* Email preview with injected variables */}
      <div className="w-[50%]" dangerouslySetInnerHTML={{ __html: emailTemp }} />

      {/* Editable fields for variables */}
      <div className="w-[50%] border rounded-lg p-4 my-[40px]">
        {Object.entries(variables).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block text-sm font-medium text-white capitalize">
              {key}
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={value}
              onChange={handleChange}
              className="mt-1 block text-white w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
        <button
          onClick={handleClick}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md" >
          Print HTML
        </button>
      </div>
    </div>
  );
}
