type PostType = {
        parentId?: number;
        typeId: number;
        title: string;
        body: string;
        isHide: number;
        isComplete: number;
        isAnonymous: number;
        tagNames?: string[];
}

export type { PostType }