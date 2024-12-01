"use client"; // Used to set this component as a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Importing css files
import "@/app/globals.css";

// Importing light/dark mode toggle button
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
// Importing Shadcn/ui components
import { Button } from "@/components/ui/button";
import axios from 'axios';

import LeftPad from "@/components/LeftPad";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FaUserDoctor } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { vitalsSchema, allValuesSchema } from "@/utils/constants";
import { LoadingButton } from "@/components/ui/loading-button";
import MainPad from "@/components/MainPad";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [bgColor, setBgColor] = useState<string>('');
    const [bgColor40, setBgColor40] = useState<string>('');
    const [visible, setVisible] = useState(false)
    const [prediction, setPrediction] = useState(""); // State for the prediction result
    const [prediction40, setPrediction40] = useState(""); // State for the prediction result
    const [firstResponse, setFirstResponse] = useState("");
    const [selectedOption, setSelectedOption] = useState("option-one");

    const form = useForm<z.infer<typeof vitalsSchema>>({
        resolver: zodResolver(vitalsSchema),
    });
    const { reset } = form;

    const form1 = useForm<z.infer<typeof allValuesSchema>>({
        resolver: zodResolver(allValuesSchema),
    });

    const onSubmitPrediction40 = async (values: z.infer<typeof allValuesSchema>) => {
        setLoading(true);  // Start the loading state
        const { HR, O2Sat, Temp, SBP, MAP, DBP, Resp, EtCO2, BaseExcess, HCO3, FiO2, pH, PaCO2, SaO2, AST, BUN,
            Alkalinephos, Calcium, Chloride, Creatinine, Bilirubin_direct,
            Glucose, Lactate, Magnesium, Phosphate, Potassium,
            Bilirubin_total, TroponinI, Hct, Hgb, PTT, WBC,
            Fibrinogen, Platelets, Age, Gender, Unit1, Unit2,
            HospAdmTime, ICULOS } = values;

        try {
            // Send POST request to the Python app
            const response = await fetch("http://localhost:8001/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    HR, O2Sat, Temp, SBP, MAP, DBP, Resp, EtCO2, BaseExcess, HCO3, FiO2, pH, PaCO2, SaO2, AST, BUN,
                    Alkalinephos, Calcium, Chloride, Creatinine, Bilirubin_direct,
                    Glucose, Lactate, Magnesium, Phosphate, Potassium,
                    Bilirubin_total, TroponinI, Hct, Hgb, PTT, WBC,
                    Fibrinogen, Platelets, Age, Gender, Unit1, Unit2,
                    HospAdmTime, ICULOS
                })
            });

            // Handle response
            if (!response.ok) {
                throw new Error('Failed to fetch prediction from Python app');
            }

            // Parse the response JSON
            const data = await response.json();
            // Handle success (e.g., showing prediction result)
            console.log('Prediction result:', data.prediction);
            console.log('Probability result:', data.probabilities);

            if (data.prediction == 0) {
                setPrediction40("Low Risk")
            } else {
                setPrediction40("High Risk")

            }

            let bgColor40 = '';
            let message = '';

            if (data.prediction === 1) {
                if (data.probabilities <= 0.1) {
                    bgColor40 = 'bg-[#96cb5a]'; // Green for low probability
                    message = "Sepsis risk is minimal based on the prediction. However, continue to monitor vitals and ensure appropriate follow-up based on patient history and clinical judgment.";
                } else if (data.probabilities > 0.1 && data.probabilities <= 0.3) {
                    bgColor40 = 'bg-[#ff8447]'; // Orange for moderate probability
                    message = "Moderate risk of sepsis detected. Initiate further diagnostic tests (e.g., blood cultures, lactate levels, organ function tests) and consider clinical intervention if indicated.";
                } else {
                    bgColor40 = 'bg-[#e13d3d]'; // Red for high probability
                    message = "High sepsis probability detected. Immediate action is required. Administer fluids, broad-spectrum antibiotics, and monitor organ function closely. Consider ICU referral based on patient condition.";
                }
            } else {
                bgColor40 = 'bg-[#96cb5a]'; // Green for no predicted sepsis
                message = "Sepsis is unlikely based on the model's prediction. However, continue to monitor for any clinical signs of infection, especially in patients with risk factors.";
            }

            setPrediction40(message);

            // Optionally, update UI with the prediction data (you could set state here)
            setBgColor40(bgColor40);  // Update background color dynamically

            // Optionally, update UI with the prediction data (you could set state here)
            setLoading(false);  // Stop the loading state
            // reset();
            setVisible(true)
            // alert(`Prediction result: ${data.prediction}`);
            // HR, O2Sat, Temp, SBP, MAP, DBP, Resp, EtCO2
            const response1 = await axios.post('http://127.0.0.1:5000/api/chat', {
                input: `Based on the following patient vitals [Heart Rate: ${HR}, Pulse Oximetry (%): ${O2Sat}, Temperature: ${Temp}, Systolic BP (mm Hg): ${SBP}, Mean Arterial Pressure (mm Hg): ${MAP}, Diastolic BP (mm Hg): ${DBP}, Respiration Rate (breaths/min): ${Resp}, End Tidal CO2 (mm Hg): ${EtCO2}], the model predicts a ${prediction} likelihood of sepsis.
                Please evaluate the patient's condition further. Based on the model’s prediction, consider the following recommendations:
                - For low probability: Monitor the patient’s condition and vitals closely, but no immediate intervention is necessary unless clinical signs change.
                - For moderate probability: Consider initiating further diagnostic tests (e.g., blood cultures, lactate levels, organ function tests), and start broad-spectrum antibiotics if infection is suspected.
                - For high probability: Immediate intervention is recommended, including administering fluids, broad-spectrum antibiotics, and monitoring organ function closely. Evaluate the need for ICU admission based on the patient's overall condition.
                Please continue to follow standard clinical protocols and adjust management based on your professional judgment.
                `
            });
            setFirstResponse(response1.data.response)

        } catch (error: any) {
            console.error('Error:', error.message);
            setLoading(false);  // Stop the loading state
            alert('An error occurred: ' + error.message);  // Display error message to the user
        }
    };

    const onSubmitPrediction = async (values: z.infer<typeof vitalsSchema>) => {
        setLoading(true);  // Start the loading state
        const { HR, O2Sat, Temp, SBP, MAP, DBP, Resp, Etco2 } = values;

        try {
            // Send POST request to the Python app
            const response = await fetch("http://localhost:8002/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ HR, O2Sat, Temp, SBP, MAP, DBP, Resp, Etco2 })
            });

            // Handle response
            if (!response.ok) {
                throw new Error('Failed to fetch prediction from Python app');
            }

            // Parse the response JSON
            const data = await response.json();
            // Handle success (e.g., showing prediction result)
            console.log('Prediction result:', data.prediction);
            console.log('Probability result:', data.probabilities);

            if (data.prediction == 0) {
                setPrediction("Low Risk")
            } else {
                setPrediction("High Risk")

            }

            let bgColor = '';
            let message = '';

            if (data.prediction === 1) {
                if (data.probabilities <= 0.1) {
                    bgColor = 'bg-[#96cb5a]'; // Green for low probability
                    message = "There is a low likelihood of sepsis. However, to ensure your health and safety, consider consulting a doctor.";
                } else if (data.probabilities > 0.1 && data.probabilities <= 0.3) {
                    bgColor = 'bg-[#ff8447]'; // Orange for moderate probability
                    message = "There is a moderate risk of sepsis. It is highly recommended that you consult a doctor for further evaluation.";
                } else {
                    bgColor = 'bg-[#e13d3d]'; // Red for high probability
                    message = "There is a high likelihood of sepsis. Immediate medical attention is strongly advised.";
                }
            } else {
                bgColor = 'bg-[#96cb5a]'; // Green for no predicted sepsis
                message = "It is unlikely that you have sepsis. Nonetheless, consulting a doctor for a professional opinion is always a prudent choice.";
            }

            setPrediction(message);

            setBgColor(bgColor);  // Update background color dynamically

            // Optionally, update UI with the prediction data (you could set state here)
            setLoading(false);  // Stop the loading state

            reset();

            setVisible(true)

            const response1 = await axios.post('http://127.0.0.1:5000/api/chat', {
                input: `Based on those patient vitals signs [Heart Rate : ${HR}, Pulse oximetry (%) : ${O2Sat}, Temperature : ${Temp}, Systolic BP (mm Hg) : ${SBP}, Mean arterial pressure (mm Hg) : ${MAP}, Diastolic BP (mm Hg) : ${DBP}, Respiration rate (breaths/min) : ${Resp}, End tidal carbon dioxide (mm Hg) : ${Etco2}, the model predict ${prediction} to have sepsis, give advices to patient, note you are talking to a patient use 'you' `
            });
            setFirstResponse(response1.data.response)


        } catch (error: any) {
            console.error('Error:', error.message);
            setLoading(false);  // Stop the loading state
            alert('An error occurred: ' + error.message);  // Display error message to the user
        }
    };

    return (
        <>  <header className="fixed top-0 left-0 w-full px-[25px] border-b-4 border-[#143644]  flex bg-[#e2e2e2] justify-between items-center z-100">
            <div className="flex justify-center items-center gap-3">
                <h2 className="text-[1.2em] font-bold cursor-pointer text-[#143644] hover:text-primary">
                    SepsiGUARD
                </h2>
            </div>

            <nav className="navbar flex space-x-8 items-center p-4">
                <Link
                    href="/"
                    className="relative text-base font-bold text-black group hover:text-black"
                >
                    Home
                    <span className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-black rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"></span>
                </Link>
                <Link
                    href="/main"
                    className="relative text-base font-bold text-primary group hover:text-black"
                >
                    Main
                    <span className="text-primary absolute left-0 bottom-[-6px] w-full h-[2px] bg-black rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"></span>
                </Link>
                <Link
                    href="#aboutus"
                    className="relative text-base font-bold text-black group hover:text-black"
                >
                    About Us
                    <span className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-black rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"></span>
                </Link>
                <Link
                    href="#"
                    className="relative text-base font-bold text-black group hover:text-black"
                >
                    FAQ
                    <span className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-black rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"></span>
                </Link>
                <Button onClick={() => { router.push("/main") }} variant="default" className="rounded-lg gap-1 h-9 bg-[#143644] hover:bg-primary text-[#D8EFEF]">
                    <span className=" text-sm font-bold">Try Here</span>

                    <ChevronRightIcon className="h-5 w-5 gap-2" />
                </Button>
            </nav>
        </header>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] mt-24">
                {visible ? <LeftPad firstResponse={firstResponse} /> : <MainPad />}
                <Card className="flex-col justify-center items-center w-full max-w bg-[#D1D5DB]">
                    <CardContent >
                        <Tabs defaultValue="Patient" className="w-full mt-4">
                            <TabsList>
                                <TabsTrigger value="Patient" className="w-full">
                                    Patient
                                </TabsTrigger>
                                <TabsTrigger value="Doctor" className="w-full">
                                    Doctor
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="Patient">
                                <div className="flex justify-start items-center gap-3">
                                    <User className="h-8 w-8 text-primary" />
                                    <h1 className="text-center font-bold text-2xl my-2 text-primary cursor-pointer">
                                        Patient
                                    </h1>
                                </div>
                                <h2 className="font-semibold text-xl">
                                    Please take a moment to fill in the information below.
                                </h2>
                                <div className="flex items-center justify-center py-2">
                                    <div className="mx-auto grid w-full gap-4">
                                        <Form {...form}>
                                            <form
                                                onSubmit={form.handleSubmit(onSubmitPrediction)}
                                                className="w-full flex flex-col gap-4"
                                            >
                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="HR"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Heart Rate</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="Enter your Heart Rate" {...field} value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="O2Sat"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Pulse oximetry (%)</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="Enter your Pulse oximetry" {...field} value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="Temp"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Temperature</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="Enter your temperature" {...field}
                                                                        value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="SBP"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Systolic BP (mm Hg)</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="Enter your SBP" {...field}
                                                                        value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="MAP"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Mean arterial pressure (mm Hg)</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="Enter your MAP" {...field}
                                                                        value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="DBP"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Diastolic BP (mm Hg)</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="Enter your DBP" {...field}
                                                                        value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="Resp"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Respiration rate (breaths/min)</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="Enter your Resp" {...field}
                                                                        value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="Etco2"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>End tidal carbon dioxide (mm Hg)</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="Enter your Etco2" {...field}
                                                                        value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <LoadingButton loading={loading} type="submit" className="bg-primary">
                                                    {loading ? "Prediting..." : "Predict"}
                                                </LoadingButton>
                                            </form>
                                        </Form>
                                        <Separator orientation="horizontal" className="text-black" />
                                    </div>
                                </div>
                                {/* Result Box */}
                                {/* {prediction && ( */}
                                <div className={`p-4 border rounded-lg shadow-sm ${bgColor}`}>
                                    <h3 className="text-xl font-bold">Prediction Result</h3>
                                    <p className="mt-2 font-semibold text-white">{prediction}</p>
                                </div>
                                {/* )} */}
                            </TabsContent>
                            <TabsContent value="Doctor">
                                <div className="flex justify-start items-center gap-3">
                                    <FaUserDoctor className="h-8 w-8 text-primary" />
                                    <h1 className="text-center font-bold text-2xl my-2 text-primary">
                                        Doctor
                                    </h1>
                                </div>
                                <div className="flex items-center justify-center py-5">
                                    <div className="mx-auto grid w-full gap-4">
                                        <h2 className="">Please choose an option</h2>
                                        <RadioGroup
                                            defaultValue="option-one"
                                            onValueChange={(value) => setSelectedOption(value)}
                                        >
                                            <div className="flex display-center items-center gap-3">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="option-one" id="option-one" />
                                                    <Label htmlFor="option-one">Form</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="option-two" id="option-two" />
                                                    <Label htmlFor="option-two">Text File</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="option-three" id="option-three" />
                                                    <Label htmlFor="option-three">PDF File</Label>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                        <Separator orientation="horizontal" className="text-black" />

                                        {selectedOption === "option-one" && (
                                            <>
                                                <Form {...form1}>
                                                    <form
                                                        onSubmit={form1.handleSubmit(onSubmitPrediction40)}
                                                        className="w-full flex flex-col gap-4 max-h-80 overflow-y-auto custom-scrollbar  overflow-x-hidden"
                                                    >
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="HR"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Heart Rate</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" placeholder="Enter your Heart Rate" {...field} value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="O2Sat"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Pulse oximetry (%)</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" placeholder="Enter your Pulse oximetry" {...field} value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Temp"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Temperature</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" placeholder="Enter your temperature" {...field}
                                                                                value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="SBP"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Systolic BP (mm Hg)</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" placeholder="Enter your SBP" {...field}
                                                                                value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="MAP"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Mean arterial pressure (mm Hg)</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" placeholder="Enter your MAP" {...field}
                                                                                value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="DBP"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Diastolic BP (mm Hg)</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" placeholder="Enter your DBP" {...field}
                                                                                value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Resp"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Respiration rate (breaths/min)</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" placeholder="Enter your Resp" {...field}
                                                                                value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="EtCO2"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>End tidal carbon dioxide (mm Hg)</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" placeholder="Enter your EtCO2" {...field}
                                                                                value={field.value || ""} // Ensure an empty string is passed if value is undefined
                                                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} // Convert to number
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="BaseExcess"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Base Excess</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Base Excess"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="HCO3"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Bicarbonate</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Bicarbonate"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="FiO2"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Fraction of Inspired Oxygen (%)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter FiO2"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="pH"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>pH Level</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter pH Level"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="PaCO2"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Partial Pressure of CO2 (mm Hg)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter PaCO2"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="SaO2"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Oxygen Saturation in Blood (%)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter SaO2"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="AST"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Aspartate Aminotransferase (U/L)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter AST"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="BUN"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Blood Urea Nitrogen (mg/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter BUN"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Alkalinephos"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Alkaline Phosphatase (U/L)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Alkalinephos"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="Calcium"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Calcium Level (mg/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Calcium"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Chloride"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Chloride Level (mEq/L)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Chloride"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="Creatinine"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Creatinine Level (mg/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Creatinine"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Bilirubin_direct"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Direct Bilirubin (mg/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Bilirubin direct"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="Glucose"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Glucose Level (mg/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Glucose"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Lactate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Lactate Level (mmol/L)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Lactate"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form1.control}
                                                                name="Magnesium"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Magnesium Level (mg/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Magnesium"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Phosphate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Phosphate Level (mg/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Phosphate"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="Potassium"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Potassium Level (mEq/L)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Potassium"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Bilirubin_total"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Total Bilirubin (mg/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Bilirubin total"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="TroponinI"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Troponin I Level (ng/mL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter TroponinI"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Hct"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Hematocrit (%)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Hct"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="Hgb"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Hemoglobin (g/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Hgb"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="PTT"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Partial Thromboplastin Time (sec)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter PTT"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="WBC"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>White Blood Cell Count (x10^3/µL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter WBC"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Fibrinogen"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Fibrinogen Level (mg/dL)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Fibrinogen"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="Platelets"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Platelets</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Platelets"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            <FormField
                                                                control={form1.control}
                                                                name="Age"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Age</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Age"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="Gender"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Gender</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Gender"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            {/* Oxygen Saturation in Blood */}
                                                            <FormField
                                                                control={form1.control}
                                                                name="Unit1"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Unit1</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Unit1"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="Unit2"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Unit2</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter Unit2"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mx-2">
                                                            {/* Oxygen Saturation in Blood */}
                                                            <FormField
                                                                control={form1.control}
                                                                name="HospAdmTime"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>HospAdmTime</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter HospAdmTime"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form1.control}
                                                                name="ICULOS"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>ICULOS</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="Enter ICULOS"
                                                                                {...field}
                                                                                value={field.value || ""}
                                                                                onChange={(e) =>
                                                                                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    </form>
                                                </Form>
                                                <LoadingButton
                                                    loading={loading}
                                                    onClick={form1.handleSubmit(onSubmitPrediction40)}
                                                    className="bg-primary"
                                                >
                                                    {loading ? "Predicting..." : "Predict"}
                                                </LoadingButton>
                                                <div className={`p-2 border rounded-lg shadow-sm ${bgColor40}`}>
                                                    <h3 className="text-xl font-bold">Prediction Result</h3>
                                                    <p className="font-semibold text-white">{prediction40}</p>
                                                </div>
                                            </>
                                        )}

                                        {selectedOption === "option-two" ? (
                                            <div className="mt-4">
                                                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                                                    Upload your text file
                                                </label>
                                                <Input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    accept={selectedOption === "option-two" ? ".txt" : ".pdf"}
                                                    className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
                                                />
                                                <LoadingButton loading={loading} onClick={() => { toast.info("This Feature is not yet available!") }} type="submit" className="w-full rounded-lg gap-1 mt-4 bg-primary">
                                                    {loading ? "Prediting..." : "Predict"}
                                                </LoadingButton>
                                            </div>
                                        ) : null}
                                        {selectedOption === "option-three" ? (
                                            <>
                                                <div className="mt-4">
                                                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                                                        Upload your PDF file
                                                    </label>
                                                    <Input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        accept={selectedOption === "option-three" ? ".txt" : ".pdf"}
                                                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
                                                    />

                                                </div>
                                                <LoadingButton loading={loading} onClick={() => { toast.info("This Feature is not yet available!") }} type="submit" className="w-full rounded-lg gap-1 bg-primary">
                                                    {loading ? "Prediting..." : "Predict"}
                                                </LoadingButton>
                                            </>
                                        ) : null}
                                    </div>
                                </div>

                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

            </div>
            <div className=""></div>
        </>
    );
}
