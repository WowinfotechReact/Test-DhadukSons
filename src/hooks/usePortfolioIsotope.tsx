import { useRef, useState, useEffect } from 'react';

let Isotope: any = null;
let imagesLoaded: any = null;

// Ensure that the libraries are only imported on the client-side
if (typeof window !== "undefined") {
    import('isotope-layout').then((mod) => (Isotope = mod.default));
    import('imagesloaded').then((mod) => (imagesLoaded = mod.default));
}

function usePortfolioIsotope() {
    const gridRef = useRef<HTMLUListElement | null>(null);
    const isoRef = useRef<Isotope | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('*');

    useEffect(() => {
        if (!Isotope || !imagesLoaded || !gridRef.current) return;

        const iso = new Isotope(gridRef.current, {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
        });

        const imgLoad = imagesLoaded(gridRef.current);
        imgLoad.on('always', () => {
            iso.arrange({});
        });

        isoRef.current = iso;

        return () => {
            iso.destroy();
            imgLoad.off('always', () => {
                iso.arrange({});
            });
        };
    }, []);

    const handleFilter = (filterValue: string) => {
        setActiveFilter(filterValue);
        isoRef.current?.arrange({ filter: filterValue });
    };

    return { gridRef, handleFilter, activeFilter };
}

export default usePortfolioIsotope;
