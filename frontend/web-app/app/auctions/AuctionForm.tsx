"use client";

import { Button, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../actions/auctionAuctions";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "@/types";

type Props = {
  auction?: Auction;
};

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus("make");
  }, [setFocus]);

  async function onSubmit(data: FieldValues) {
    try {
      let id = "";
      let res;
      if (pathname === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          await updateAuction(auction.id, data);
          id = auction.id;
        }
      }
      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  }

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        control={control}
        name="make"
        rules={{ required: "Make is required" }}
      />
      <Input
        label="Model"
        control={control}
        name="model"
        rules={{ required: "Model is required" }}
      />
      <Input
        label="Color"
        control={control}
        name="color"
        rules={{ required: "Color is required" }}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          control={control}
          type="number"
          name="year"
          rules={{ required: "Year is required" }}
        />
        <Input
          label="Mileage"
          control={control}
          type="number"
          name="mileage"
          rules={{ required: "Mileage is required" }}
        />
      </div>
      {pathname === "/auctions/create" && (
        <>
          <Input
            label="Image URL"
            control={control}
            name="imageUrl"
            rules={{ required: "Image URL is required" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price (enter 0 if no reserve)"
              control={control}
              type="number"
              name="reservePrice"
              rules={{ required: "Reserve Price is required" }}
            />
            <DateInput
              label="Auction end date/time"
              control={control}
              dateFormat="dd MMMM yyyy h:mm a"
              showTimeSelect
              name="auctionEnd"
              rules={{ required: "Auction end date is required" }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button outline color="gray">
          Cancel
        </Button>
        <Button
          isProcessing={isSubmitting}
          type="submit"
          disabled={!isValid}
          outline
          color="success"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
