import { IoCashSharp, IoPersonCircleSharp } from "react-icons/io5"

export default {
    name: "modulePricingTable",
    title: "Pricing Table",
    type: "object",
    icon: IoCashSharp,
    fields: [
        {
            name: "plans",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "membershipPlan",
                    icon: IoPersonCircleSharp,
                    fields: [
                        {
                            name: "title",
                            type: "string",
                        },
                        {
                            name: "description",
                            type: "text",
                            rows: 2,
                        },
                        {
                            name: "price",
                            type: "string",
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            plans: "plans",
        },
        prepare({ plans = [] }) {
            return {
                title: "Pricing Table",
                subtitle: plans.length + " plans",
            }
        },
    },
}
