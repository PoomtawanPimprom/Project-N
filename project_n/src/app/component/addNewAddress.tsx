import { DialogHeader } from '@/components/ui/dialog'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { userAddressInterface } from '../interface/userAddressInterface'
import { createAddress, updateUserAddress } from '../service/address/service'

export default function addNewAddress() {
    const [updateAddressData, setUpdateAddressData] = useState<userAddressInterface>({
        id: 0,
        fullName: '',
        houseNo: '',
        moo: '',
        province: '',
        district: '',
        subDistrict: '',
        postalCode: '',
        mobile: '',
        userId: 1,
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUpdateAddressData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addDataAddress = async (e: React.FormEvent) => {
        // console.log(updateAddressData)
        createAddress(updateAddressData);
        // fetchAddressData();
    }

    return (
        <Dialog>
            <DialogTrigger asChild className="self-end">
                <button className='w-full sm:w-auto px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>+ New Address</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Address</DialogTitle>
                    <DialogDescription>
                        Create your new address information below.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={addDataAddress}>

                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="fullName" name="fullName" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="First Name" />
                    </div>

                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                        <input type="text" id="mobile" name="mobile" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Mobile" />
                    </div>

                    <div>
                        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">House No</label>
                        <input type="text" id="houseNo" name="houseNo" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="House No, Street Name" />
                    </div>

                    <div>
                        <label htmlFor="moo" className="block text-sm font-medium text-gray-700">Moo</label>
                        <input type="text" id="moo" name="moo" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Moo" />
                    </div>

                    <div>
                        <label htmlFor="subDistrict" className="block text-sm font-medium text-gray-700">Sub-District</label>
                        <input type="text" id="subDistrict" name="subDistrict" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Sub-District" />
                    </div>

                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                        <input type="text" id="district" name="district" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="District" />
                    </div>

                    <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
                        <input type="text" id="province" name="province" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Province" />
                    </div>

                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <input type="text" id="postalCode" name="postalCode" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Postal Code" />
                    </div>

                    <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <button type="button" className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
                        </DialogClose>
                        <button type="submit" className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Save</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
