export interface Track {
        "album":{
            "album_type": string;
            "artists":  {"external_urls": {"spotify": string;};"href": string;"id": string;"name": string;"type": string;"uri": string;}[];
            "available_markets": string[];
            "external_urls": {"spotify": string};
            "href": string;
            "id": string;
            "images": {"height":number;"url": string;"width":number;}[],
            "name": string;
            "release_date": string;
            "release_date_precision": string;
            "total_tracks": number;
            "type": string;
            "uri": string;
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": string;
                },
                "href": string,
                "id": string;
                "name": string,
                "type": string,
                "uri": string
            },
            {
                "external_urls": {
                    "spotify": string;
                },
                "href": string,
                "id": string,
                "name": string,
                "type": string,
                "uri": string;
            }
        ],
        "disc_number": number,
        "duration_ms": number,
        "episode": boolean,
        "explicit": boolean,
        "external_ids": {
            "isrc": string
        },
        "external_urls": {
            "spotify": string
        },
        "href": string,
        "id": string,
        "is_local": boolean,
        "name": string,
        "popularity": number,
        "preview_url": null | string,
        "track": boolean,
        "track_number": number,
        "type": string,
        "uri": string
    }

export interface trackes {
    "added_at": string;
    "added_by": {
        "external_urls": {
            "spotify": string;
        },
        "href": string;
        "id": string;
        "type": string;
        "uri": string;
    },
    "is_local": boolean;
    "primary_color": null | string,
    "track":Track,
    "video_thumbnail": {
        "url": null | string
    }
}


export interface spotifyPlaylistInterface{
    "collaborative": boolean;
    "description": string;
    "external_urls": {
        "spotify": string;
    };
    "href":string;
    "id": string;
    "images": { "height": number; "url": string; "width": number;}[];
    "name": string;
    "owner": {
        "display_name": string;
        "external_urls": {"spotify": string;};
        "href":string;
        "id": string;
        "type": string;
        "uri": string
    };
    "primary_color": string | null;
    "public": boolean;
    "snapshot_id": string;
    "tracks": {
        "href": string;
        "total": number;
        "items":trackes[];
    };
    "type": string;
    "uri": string;
}

