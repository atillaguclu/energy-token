import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const plans = [
    {
        name: 'Buy',
    },
    {
        name: 'Sell',

    }
]

export default function ButtonGroup() {
    const [selected, setSelected] = useState(plans[0])

    return (
        <div className="w-full px-4 py-2">
            <div className="mx-auto items-center w-full max-w-md">
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                    <div className="flex justify-center mx-auto space-x-4">
                        {plans.map((plan) => (
                            <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring ring-opacity-80 ring-[#aaffe4]'
                                        : ''
                                    }
                  ${checked ? 'bg-[#fa4191] text-white' : 'bg-transparent border-[1px] border-[#fa4191]'
                                    }
                    relative flex cursor-pointer rounded-lg px-16 py-3 shadow-md focus:outline-none`
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${checked ? 'text-white' : 'text-black'
                                                            }`}
                                                    >
                                                        {plan.name}
                                                    </RadioGroup.Label>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}