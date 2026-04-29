import { defineField } from "sanity";
import { slugify } from "./helpers";

export function slugField({
    resource = "",
    source = "title",
    fieldOptions = {},
} = {}) {
    const prefix = resource.length ? `${resource}/` : "";

    return defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        description: "The url for this content",
        ...fieldOptions,
        validation: (Rule) =>
            Rule.required().custom((slug) => {
                if (typeof slug?.current === "undefined") {
                    return true;
                }

                if (slug.current) {
                    const current = slug.current;

                    if (!current.startsWith(prefix)) {
                        return `Slug must begin with "${prefix}". Click "Generate" to reset.`;
                    }

                    if (current.slice(prefix.length).split("").includes("/")) {
                        return `Slug cannot have another "/" after "${prefix}"`;
                    }

                    if (current === prefix) {
                        return `Slug cannot be empty`;
                    }

                    if (current.endsWith("/")) {
                        return `Slug cannot end with "/"`;
                    }

                    if (current.startsWith("/")) {
                        return `Slug cannot start with "/"`;
                    }
                }

                return true;
            }),
        // inputComponent: SlugInput,
        options: {
            source,
            slugify: slugify({ prefix }),
            basePath: `4player.dk`,
            maxLength: 30,
            isUnique(slug, options) {
                const { document, getClient } = options;

                const id = document._id.replace(/^drafts\./, "");
                const params = {
                    draft: `drafts.${id}`,
                    published: id,
                    slug,
                };

                const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;

                return getClient({ apiVersion: "2025-01-01" }).fetch(
                    query,
                    params,
                );
            },
        },
    });
}

export function metaFields() {
    return [
        {
            group: "seo",
            name: "seoTitle",
            title: "SEO Title",
            type: "string",
            description: "The title to use for SEO",
            validation: (Rule) => Rule.max(70),
        },
        {
            group: "seo",
            name: "seoDescription",
            title: "SEO Description",
            type: "text",
            rows: 3,
            description: "The description to use for SEO",
            validation: (Rule) => Rule.max(160),
        },
        {
            group: "seo",
            name: "seoImage",
            title: "SEO Image",
            type: "image",
            description: "The image to use for SEO",
        },
    ];
}

export const pageModules = [
    { type: "moduleHero" },
    { type: "moduleHeroSlider" },
    { type: "moduleText" },
    { type: "modulePromo" },
    { type: "moduleContactPerson" },
    { type: "moduleImageList" },
    { type: "moduleImageCaroussel" },
    { type: "modulePricingTable" },
    { type: "modulePersonList" },
    { type: "modulePodcastList" },
    { type: "moduleHistoryList" },
    { type: "moduleTeaserPartners" },
    { type: "moduleTeaserPodcast" },
    { type: "moduleTeaserArticles" },
    { type: "moduleTeaserPressrelease" },
    { type: "moduleTeaserInitiatives" },
    { type: "moduleHighlightNumbers" },
    { type: "moduleForm" },
    { type: "moduleTable" },
    { type: "moduleBenefitsRequest" },
    { type: "moduleArticleList" },
    // { type: "moduleReusable" },
];

export const linkableReferenceTypes = [
    { type: "page" },
    { type: "article" },
    { type: "partner" },
    { type: "theme" },
    { type: "initiative" },
];
