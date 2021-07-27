import React from "react";
import './FavoriteList.scss';
import utilsService from "../../services/utilsService";
import { FavoritePreview } from "../FavoritePreview/FavoritePreview.jsx";

export function FavoriteList(props) {
    return (
        <>
            {
//If favorites prop have value, then render all saved favorites.
                props.favorites &&
                props.favorites.map(favorite => {
                    let id = utilsService.idGen();
                    return (
                        <div className="favorite-card flex column align-center space-around" onClick={() => props.updatePickedFavorite(favorite)} key={id}>
                            <FavoritePreview favorite={favorite} unitType={props.unitType} />
                        </div>
                    )
                })
            }

        </>
    );
}

