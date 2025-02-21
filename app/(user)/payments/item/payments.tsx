"use client";
import React, { useState } from "react";
import Button from "../../../../components/common/button";
import Icon from "../../../../components/common/icon";
import PaymentMethod from "./payment-method";
import Coupons from "./coupons";
import Link from "next/link";

const Payments = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className=" flex xl:flex-row flex-col gap-20">
            <div className="xl:w-1/2 mt-6">
                <div>
                    <div className="flex flex-col ">
                        <h2 className="text-main text-sh mb-6">Your payments</h2>
                        <p className="text-p text-wrap">
                            Keep track of all your payments and refunds.
                        </p>
                        <Link href={"/payments/item/your-payment"} className="mt-6 ">
                            <Button className="!bg-black text-white rounded-md !py-4 w-fit">
                                Manage payments
                            </Button>
                        </Link>

                    </div>
                    <PaymentMethod open={open} setOpen={setOpen} />
                    <Coupons />
                </div>
            </div>
            <div className="xl:w-1/2 ">
                <div className="border rounded-md p-4 basis-[30%] sm:w-[350px] w-full  h-fit">
                    <Icon name="payment" />
                    <h4 className="mt-4 text-p">Make all payments through Airbnb</h4>
                    <p className="text-wrap text-s text-[#6a6a6a] mt-1">
                        Always pay and communicate through Airbnb to ensure you're protected
                        under our <span className="underline text-black font-semibold cursor-pointer">Terms of Service</span>, <span className="underline text-black font-semibold cursor-pointer">Payments Terms of Service</span> , cancellation,
                        and other safeguards. <span className="underline text-black font-semibold cursor-pointer"> Learn more</span>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Payments;
