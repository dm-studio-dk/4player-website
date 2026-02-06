import { IoPeopleSharp } from "react-icons/io5"
import { PERSON_DEPARTMENTS } from "../../../utils/const"

export default {
    name: "modulePersonList",
    title: "Person List",
    type: "object",
    icon: IoPeopleSharp,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "mode",
            title: "Mode",
            type: "string",
            initialValue: "selected",
            options: {
                list: [
                    { title: "All", value: "all" },
                    { title: "Department", value: "department" },
                    { title: "Selected", value: "selected" },
                ],
            },
        },
        {
            name: "department",
            type: "string",
            hidden: ({ parent }) => parent.mode !== "department",
            options: {
                list: [...PERSON_DEPARTMENTS],
            },
        },
        {
            name: "people",
            title: "People",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: { type: "person" },
                    weak: true,
                    options: { disableNew: true },
                },
            ],
            hidden: ({ parent }) => parent.mode !== "selected",
        },
    ],
    preview: {
        select: {
            title: "title",
            department: "department",
            mode: "mode",
            people: "people",
            person0: "people.0.name",
            person1: "people.1.name",
            person2: "people.2.name",
        },
        prepare({ title, department, mode, person0, person1, person2 }) {
            let subtitle

            if (mode == "all") subtitle = "All employees"
            if (mode == "selected")
                subtitle = [person0, person1, person2]
                    .filter(Boolean)
                    .join(", ")
            if (mode == "department")
                subtitle = PERSON_DEPARTMENTS.find(
                    (d) => d.value == department,
                ).title

            return {
                title: title || "Person List",
                subtitle,
            }
        },
    },
}
