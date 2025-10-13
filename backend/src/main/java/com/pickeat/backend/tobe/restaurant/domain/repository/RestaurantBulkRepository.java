package com.pickeat.backend.tobe.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.Restaurant;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RestaurantBulkRepository {

    private final JdbcTemplate jdbcTemplate;

    public void batchInsert(List<Restaurant> restaurants) {
        if (restaurants == null || restaurants.isEmpty()) {
            return;
        }

        final String sql = """
                INSERT INTO restaurant
                  (name, food_category, distance, road_address_name, place_url,
                   tags, picture_key, ppicture_url, is_excluded, like_count,
                   "type", pickeat_id, created_at, updated_at,deleted)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;

        final Timestamp now = Timestamp.valueOf(LocalDateTime.now());

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Restaurant r = restaurants.get(i);

                ps.setString(1, r.getRestaurantInfo().getName());
                ps.setString(2, r.getRestaurantInfo().getFoodCategory().name());
                ps.setObject(3, r.getRestaurantInfo().getDistance());
                ps.setString(4, r.getRestaurantInfo().getRoadAddressName());
                ps.setString(5, r.getRestaurantInfo().getPlaceUrl());
                ps.setString(6, r.getRestaurantInfo().getTags());

                if (r.getRestaurantInfo().getPicture() != null) {
                    ps.setString(7, r.getRestaurantInfo().getPicture().getPictureKey());
                    ps.setString(8, r.getRestaurantInfo().getPicture().getPictureUrl());
                } else {
                    ps.setNull(7, java.sql.Types.VARCHAR);
                    ps.setNull(8, java.sql.Types.VARCHAR);
                }
                ps.setBoolean(9, r.getIsExcluded());
                ps.setInt(10, r.getLikeCount());
                ps.setString(11, r.getType().name());
                ps.setLong(12, r.getPickeat().getId());
                ps.setTimestamp(13, now);
                ps.setTimestamp(14, now);
                ps.setBoolean(15, false);
            }

            @Override
            public int getBatchSize() {
                return restaurants.size();
            }
        });
    }
}
